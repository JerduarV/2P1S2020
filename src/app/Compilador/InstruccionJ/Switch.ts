import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { TablaSimbJ, NewTablaLocal } from '../TSJ/TablaSimbJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo } from '../TSJ/Tipo';
import { getTempAct, getEtiqueta, concatCodigo, genTemp, getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';
import { DecFun } from './DecFun';
import { Caso } from './Caso';
import { DeclaracionJ } from './DeclaracionJ';
import { DefStruct } from './DefStruct';

export class Switch extends InstruccionJ {

    private readonly exp: ExpresionJ;
    private readonly lista_casos: Caso[];

    constructor(exp: ExpresionJ, lista: Caso[], fila: number, col: number) {
        super(null, fila, col);
        this.exp = exp;
        this.lista_casos = lista;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        //console.log('TODAVÍA NO TRADUZCO');

        let o: Object = this.exp.getTipo(ts);
        if (o instanceof ErrorLup) {
            ts.GenerarError('Switch: Error en la expresión condicional', this.getFila(), this.getCol());
            return;
        }

        let tipo_cond: Tipo = <Tipo>o;
        if (!tipo_cond.esNativo() || tipo_cond.soyArreglo() || tipo_cond.esStruct()) {
            ts.GenerarError('Switch: El tipo de la condición no es valida', this.getFila(), this.getCol());
            return;
        }

        this.exp.Traducir(ts);
        let t_cond: string = getTempAct();
        let etq_eval: string = getEtiqueta();
        let etq_sal: string = getEtiqueta();

        let t_casos: string[] = [];
        let etq_casos: string[] = [];

        //RESUELVO LAS EXPRESIONES DE CADA CASO
        for (let i = 0; i < this.lista_casos.length; i++) {
            if (this.lista_casos[i].getExp() == null) {
                t_casos.push(null);
                etq_casos.push(getEtiqueta());
            } else {

                let ocaso: Object = this.lista_casos[i].getExp().getTipo(ts);
                if (ocaso instanceof ErrorLup) {
                    ts.GenerarError('Hubo un error en la expresión del caso', this.lista_casos[i].getExp().getFila(), this.lista_casos[i].getExp().getCol());
                    return;
                }
                let tipo_caso: Tipo = <Tipo>ocaso;

                if (tipo_cond.isString() && !tipo_caso.isString()) {
                    ts.GenerarError('Debe ser string', this.lista_casos[i].getExp().getFila(), this.lista_casos[i].getExp().getCol());
                    return;
                }

                this.lista_casos[i].getExp().Traducir(ts);
                t_casos.push(getTempAct());
                etq_casos.push(getEtiqueta());
            }
        }

        concatCodigo('goto ' + etq_eval + ';');

        let local: TablaSimbJ = NewTablaLocal(ts);
        local.display.insertar(null, etq_sal);

        //IMPRIMO LA ETIQUETA DEL CASO Y SUS INSTRUCCIONES
        for (let i = 0; i < this.lista_casos.length; i++) {
            
            //SI ES EL DEFECTO NO SE VA A EJECUTAR EN LINEA
            if(this.lista_casos[i].getExp() == null){
                concatCodigo('goto ' + etq_sal + ';')
            }
            concatCodigo(etq_casos[i] + ':');
            this.lista_casos[i].Traducir(local);
        }

        concatCodigo('goto ' + etq_sal + ';');

        //IMPRIMO LA ETIQUETA DE LAS EVALUACIONES
        concatCodigo(etq_eval + ':')

        //IMPRIMO LAS CONDICIONES
        for (let i = 0; i < this.lista_casos.length; i++) {
            if (this.lista_casos[i].getExp() == null) {
                concatCodigo('goto ' + etq_casos[i] + ';');
            } else {
                this.ConstruirCond(t_cond, t_casos[i], tipo_cond, etq_casos[i], ts.getTamanioFunTotal());
            }
        }

        //IPRIMO LA SALIDA
        concatCodigo(etq_sal + ':');

        ts.SacarTemporal(t_cond);
        for (let i = 0; i < t_casos.length; i++) {
            const caso = t_casos[i];
            if (caso == null) {
                continue;
            }
            ts.SacarTemporal(caso);
        }
    }

    private ConstruirCond(tcond: string, tcase: string, tipo: Tipo, etq: string, tam_fun: number): void {
        if (!tipo.isString()) {
            concatCodigo('if(' + tcond + ' == ' + tcase + ') goto ' + etq + ';');
        } else {
            let t4: string = genTemp();
            let t5: string = genTemp();
            let t3: string = genTemp();

            concatCodigo('P = P + ' + tam_fun + ';');
            concatCodigo(t4 + ' = P + 1;');
            concatCodigo('Stack[' + t4 + '] = ' + tcond + ';')
            concatCodigo(t5 + ' = P + 2;');
            concatCodigo('Stack[' + t5 + '] = ' + tcase + ';');
            concatCodigo('call jerduar_COMPSTRING;');
            concatCodigo(t3 + ' = Stack[P];');
            concatCodigo('P = P - ' + tam_fun + ';');

            concatCodigo('if(' + t3 + ' == 1) goto ' + etq + ';');
        }
    }

    public DeterminarTamanioFuncion(funcion: DecFun): void {
        this.lista_casos.forEach(caso => {
            caso.DeterminarTamanioFuncion(funcion);
        });
    }

    public BuscarVariablesGlobales(lista_dec: DeclaracionJ[]): void {
        this.lista_casos.forEach(caso => {
            caso.BuscarVariablesGlobales(lista_dec);
        });
    }

    public RecolectarStruct(lista: DefStruct[]): void {
        this.lista_casos.forEach(caso => {
            caso.RecolectarStruct(lista);
        });
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('SWITCH');
        conectarNodo(padre, n);
        let comp: string = getIdNodo('COMP');
        conectarNodo(n, comp);
        this.exp.dibujar(comp);
        let l_casos: string = getIdNodo('L_CASOS');
        conectarNodo(n, l_casos);
        this.lista_casos.forEach(caso => {
            caso.dibujar(l_casos);
        });
    }
}


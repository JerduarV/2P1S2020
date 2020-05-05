import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { Tipo } from '../TSJ/Tipo';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { SimbVar } from '../TSJ/SimbVar';
import { concatCodigo, genTemp, getTempAct } from 'src/app/Auxiliares/Utilidades';
import { DecFun } from './DecFun';

export class DeclaracionJ extends InstruccionJ {

    private readonly tipo: Tipo;
    public readonly lista_ids: string[];
    private readonly constante: boolean;
    private readonly global: boolean;
    private readonly exp: ExpresionJ;
    public dec_interna: boolean;

    constructor(tipo: Tipo, lista: string[], constante: boolean, global: boolean, e: ExpresionJ, fila: number, col: number) {
        super(null, fila, col);
        this.tipo = tipo;
        this.lista_ids = lista;
        this.constante = constante;
        this.global = global;
        this.exp = e;
        this.dec_interna = true;
    }

    public BuscarVariablesGlobales(lista_dec: DeclaracionJ[]): void {
        if (this.esGlobal()) {
            lista_dec.push(this);
        }
    }

    public Traducir(ts: TablaSimbJ): void {
        if (this.esGlobal()) {
            let variable: SimbVar = ts.BuscarGlobal(this.lista_ids[0]);
            if (variable == null) {
                ts.GenerarError('No se encontro variable: ' + this.lista_ids[0], this.getFila(), this.getCol());
                return;
            }

            let o: Object = this.exp.getTipo(ts);
            if(o instanceof ErrorLup){
                ts.GenerarError('Error en la expresión',this.getFila(),this.getCol());
                return;
            }

            let tipo: Tipo = <Tipo>o;
            if(!variable.getTipo().esIgualA(tipo) && !variable.getTipo().AplicaCasteo(tipo)){
                ts.GenerarError('Error en los tipos',this.getFila(),this.getCol());
                return;
            }

            this.exp.Traducir(ts);
            let tr: string = getTempAct();

            concatCodigo('Heap[' + variable.getPosicion() + '] = ' + tr + ';');
            concatCodigo('Heap[' + (variable.getPosicion() + 1) + '] = 1;');

            return;
        }

        //VERIFICO LOS TIPOS
        let tipo: Tipo;
        if (this.TipoImplicito()) {
            let o: Object = this.exp.getTipo(ts);
            if (o instanceof ErrorLup) {
                ts.GenerarError('Hubo un error en la expresión ', this.getFila(), this.getCol());
                return;
            } else {
                tipo = <Tipo>o;
            }
        } else {
            tipo = this.tipo;
        }

        if (!ts.getExisteTipo(tipo)) {
            ts.GenerarError('El tipo no existe: ' + tipo.getString(), this.getFila(), this.getCol());
            return;
        }

        this.lista_ids.forEach(element => {
            ts.GuardarVarible(element, tipo, this.esGlobal(), this.esConstante(), ts.tam_fun_actual++, this.getFila(), this.getCol());
        });

        for (let i = 0; i < this.lista_ids.length; i++) {
            let variable: SimbVar = ts.BuscarVariable(this.lista_ids[i]);
            if (variable == null) {
                ts.GenerarError('No se encontro variable: ' + this.lista_ids[i], this.getFila(), this.getCol());
                return;
            }
            let temp: string = genTemp();
            concatCodigo(temp + ' = P + ' + variable.getPosicion() + ';');
            concatCodigo('Stack[' + temp + '] = ' + variable.getTipo().getValDefecto() + ';');
        }

        if (this.exp != null) {
            let o: Object = this.exp.getTipo(ts);
            if (o instanceof ErrorLup) {
                ts.GenerarError('Hubo un error en la expresión ', this.getFila(), this.getCol());
                return;
            }

            tipo = <Tipo>o;
            this.exp.Traducir(ts);
            let t1 = getTempAct();
            for (let i = 0; i < this.lista_ids.length; i++) {
                let variable: SimbVar = ts.BuscarVariable(this.lista_ids[i]);
                if (variable == null) {
                    ts.GenerarError('La varible ' + this.lista_ids[i] + ' no existe', this.getFila(), this.getCol());
                    continue;
                }
                if (!variable.getTipo().esIgualA(tipo) && !variable.getTipo().AplicaCasteo(tipo)) {
                    ts.GenerarError('Los tipos no coinciden ' + variable.getTipo().getString() + ' : ' + tipo.getString(), this.getFila(), this.getCol());
                    return;
                }
                let temp: string = genTemp();
                concatCodigo(temp + ' = P + ' + variable.getPosicion() + ';');
                concatCodigo('Stack[' + temp + '] = ' + t1 + ';');
            }
            ts.SacarTemporal(t1);
        }

    }

    public DeterminarTamanioFuncion(funcion: DecFun): void {
        if (this.esGlobal()) {
            return;
        }
        funcion.tamanio += this.lista_ids.length;
    }

    public getExp(): ExpresionJ {
        return this.exp;
    }

    public esGlobal(): boolean {
        return this.global;
    }

    public esConstante(): boolean {
        return this.constante;
    }

    public esVar(): boolean {
        return this.tipo == null ? false : this.tipo.isVar();
    }

    public getListaIDs(): string[] {
        return this.lista_ids;
    }

    public getTipo(): Tipo {
        return this.tipo;
    }

    public TipoImplicito(): boolean {
        return this.esVar() || this.esConstante() || this.esGlobal();
    }

}
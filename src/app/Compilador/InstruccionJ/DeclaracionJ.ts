import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { Tipo } from '../TSJ/Tipo';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { SimbVar } from '../TSJ/SimbVar';
import { concatCodigo, genTemp, getTempAct, getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';
import { DecFun } from './DecFun';

export class DeclaracionJ extends InstruccionJ {

    private readonly tipo: Tipo;
    public readonly lista_ids: string[];
    private readonly constante: boolean;
    private readonly global: boolean;
    private readonly exp: ExpresionJ;
    public dec_interna: boolean;
    public tipo_exp_global: Tipo;

    constructor(tipo: Tipo, lista: string[], constante: boolean, global: boolean, e: ExpresionJ, fila: number, col: number) {
        super(null, fila, col);
        this.tipo = tipo;
        this.lista_ids = lista;
        this.constante = constante;
        this.global = global;
        this.exp = e;
        this.tipo_exp_global = null;
        this.dec_interna = true;
    }

    public BuscarVariablesGlobales(lista_dec: DeclaracionJ[], ts: TablaSimbJ): void {
        if (this.esGlobal()) {
            if (this.exp != null) {
                let o: Object = this.exp.getTipo(ts);
                if (!(o instanceof ErrorLup)) {
                    this.tipo_exp_global = <Tipo>o;
                }
            }
            lista_dec.push(this);
        } else {
            //VERIFICO LOS TIPOS
            let tipo: Tipo;
            if (this.TipoImplicito()) {
                let o: Object = this.exp.getTipo(ts);
                if (o instanceof ErrorLup) {
                    //ts.GenerarError('Hubo un error en la expresión ', this.getFila(), this.getCol());
                    return;
                } else {
                    tipo = <Tipo>o;
                }
            } else {
                tipo = this.tipo;
            }

            if (!ts.getExisteTipo(tipo)) {
                //ts.GenerarError('El tipo no existe: ' + tipo.getString(), this.getFila(), this.getCol());
                return;
            }

            this.lista_ids.forEach(element => {
                ts.GuardarVarible(element, tipo, this.esGlobal(), this.esConstante(), ts.tam_fun_actual++, this.getFila(), this.getCol(), false, "");
            });
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
            if (o instanceof ErrorLup) {
                ts.GenerarError('Error en la expresión', this.getFila(), this.getCol());
                return;
            }

            let tipo: Tipo = <Tipo>o;

            if (!variable.getTipo().esIgualA(tipo) && !variable.getTipo().AplicaCasteo(tipo) && !variable.getTipo().isVoid()) {
                ts.GenerarError(`Error en los tipos ${variable.getTipo().getString()} : ${tipo.getString()}`, this.getFila(), this.getCol());
                return;
            }

            if (variable.getTipo().isVoid()) {
                variable.setTipo(tipo);
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
            ts.GuardarVarible(element, tipo, this.esGlobal(), this.esConstante(), ts.tam_fun_actual++, this.getFila(), this.getCol(), true, ts.funcion_actual.getNombre());
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
                    ts.GenerarError('Dec: Los tipos no coinciden ' + variable.getTipo().getString() + ' : ' + tipo.getString(), this.getFila(), this.getCol());
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

    public dibujar(padre: string): void {
        let n: string = getIdNodo('DEC');
        conectarNodo(padre, n);

        if (this.tipo != null) {
            conectarNodo(n, getIdNodo(this.tipo.getString()));
        }

        let l_id: string = getIdNodo('LID');
        this.lista_ids.forEach(id => {
            let n_id: string = getIdNodo(id);
            conectarNodo(l_id, n_id);
        });

        conectarNodo(n, l_id);

        if (this.exp != null) {
            this.exp.dibujar(n);
        }
    }

}
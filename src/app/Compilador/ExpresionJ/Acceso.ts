import { ExpresionJ } from './ExpresionJ';
import { Identificador } from './Identificador';
import { SimbVar } from '../TSJ/SimbVar';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { genTemp, concatCodigo, getTempAct } from 'src/app/Auxiliares/Utilidades';
import { Tipo } from '../TSJ/Tipo';
import { CallFun } from './CallFun';
import { CallFun2 } from './CallFun2';

export class Acceso extends ExpresionJ {

    public readonly lista_exp: ExpresionJ[];

    //ESTA VARIABLE LA MODIFICO EN LA ASIGNACIÓN
    public exp: ExpresionJ;

    constructor(l: ExpresionJ[], fila: number, col: number) {
        super(fila, col);
        this.lista_exp = l;
    }

    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        if (this.lista_exp.length == 1) {
            if (this.lista_exp[0] instanceof Identificador) {
                let variable: SimbVar = ts.BuscarVariable((<Identificador>this.lista_exp[0]).getId())
                if (variable == null) {
                    return ts.GenerarError('No existe la variable ' + (<Identificador>this.lista_exp[0]).getId(), this.getFila(), this.getCol());
                }
                return variable.getTipo();
            }else if(this.lista_exp[0] instanceof CallFun){
                return (<CallFun>this.lista_exp[0]).getTipo(ts);
            }else if(this.lista_exp[0] instanceof CallFun2){
                return (<CallFun2>this.lista_exp[0].getTipo(ts));
            }
        }
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        if (this.getTipo(ts) instanceof ErrorLup) {
            return;
        }

        //SI ES UN ACCESO PARA ASIGNACIÓN
        if (this.exp != null) {
            this.TraducirAsig(ts);
            
        }
        //SI ES UNA ACCSO PARA GET 
        else {
            this.TraducirAcceso(ts);
        }
    }

    /**
     * Traduce un acceso para obtener un valor
     * @param ts Tabla de símbolos
     */
    public TraducirAcceso(ts: TablaSimbJ): void {
        if (this.lista_exp.length == 1) {
            //#region IDENTIFICADOR
            if (this.lista_exp[0] instanceof Identificador) {
                let variable: SimbVar = ts.BuscarVariable((<Identificador>this.lista_exp[0]).getId())
                if (variable == null) {
                    return;
                }

                if (!variable.getEsGlobal()) {
                    let temp: string = genTemp();
                    let tem_val: string = genTemp();
                    concatCodigo(temp + ' = P + ' + variable.getPosicion() + ';');
                    concatCodigo(tem_val + ' = Stack[' + temp + '];')
                    ts.guardarTemporal(tem_val);
                } else {
                    let tem_val: string = genTemp();
                    concatCodigo(tem_val + ' = Heap[' + variable.getPosicion() + '];');
                    ts.guardarTemporal(tem_val);
                }
            }
            //#endregion
            //#region CALL FUN
            else if(this.lista_exp[0] instanceof CallFun){
                (<CallFun>this.lista_exp[0]).Traducir(ts);
            }
            //#endregion
            //#region CALL FUN 2
            else if(this.lista_exp[0] instanceof CallFun2){
                (<CallFun2>this.lista_exp[0]).Traducir(ts);
            }
            //#endregion
        }
    }

    /**
     * Traduce un acceso para setear un valor
     * @param ts Tabla de simbolos
     */
    public TraducirAsig(ts: TablaSimbJ) {
        if (this.lista_exp.length == 1) {
            if (this.lista_exp[0] instanceof Identificador) {
                let variable: SimbVar = ts.BuscarVariable((<Identificador>this.lista_exp[0]).getId())
                if (variable == null) {
                    return;
                }

                let o: Object = this.exp.getTipo(ts);
                if (o instanceof ErrorLup) {
                    ts.GenerarError('La expresión es un error', this.getFila(), this.getCol());
                }

                if (!variable.getTipo().esIgualA(<Tipo>o) && !variable.getTipo().AplicaCasteo(<Tipo>o)) {
                    ts.GenerarError('Asig: Los tipos no coinciden', this.getFila(), this.getCol());
                    return;
                }

                if (!variable.getEsGlobal()) {
                    let temp: string = genTemp();
                    concatCodigo(temp + ' = P + ' + variable.getPosicion() + ';');

                    this.exp.Traducir(ts);
                    let t1: string = getTempAct();

                    concatCodigo('Stack[' + temp + '] = ' + t1 + ';');
                } else {
                    this.exp.Traducir(ts);
                    let t1: string = getTempAct();

                    concatCodigo('Heap[' + variable.getPosicion() + '] = ' + t1 + ';');
                }
            }
        }
    }

}
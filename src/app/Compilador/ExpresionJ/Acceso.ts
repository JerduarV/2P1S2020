import { ExpresionJ } from './ExpresionJ';
import { Identificador } from './Identificador';
import { SimbVar } from '../TSJ/SimbVar';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { genTemp, concatCodigo, getTempAct } from 'src/app/Auxiliares/Utilidades';
import { Tipo } from '../TSJ/Tipo';
import { CallFun } from './CallFun';
import { CallFun2 } from './CallFun2';
import { DefStruct } from '../InstruccionJ/DefStruct';

export class Acceso extends ExpresionJ {

    public readonly lista_exp: ExpresionJ[];

    //ESTA VARIABLE LA MODIFICO EN LA ASIGNACIÓN
    public exp: ExpresionJ;

    constructor(l: ExpresionJ[], fila: number, col: number) {
        super(fila, col);
        this.lista_exp = l;
    }

    //#region  GET TIPO
    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        //#region ACCESO DE UN ELEMENTO
        if (this.lista_exp.length == 1) {
            if (this.lista_exp[0] instanceof Identificador) {
                let variable: SimbVar = ts.BuscarVariable((<Identificador>this.lista_exp[0]).getId())
                if (variable == null) {
                    return ts.GenerarError('No existe la variable ' + (<Identificador>this.lista_exp[0]).getId(), this.getFila(), this.getCol());
                }
                return variable.getTipo();
            } else if (this.lista_exp[0] instanceof CallFun) {
                return (<CallFun>this.lista_exp[0]).getTipo(ts);
            } else if (this.lista_exp[0] instanceof CallFun2) {
                return (<CallFun2>this.lista_exp[0].getTipo(ts));
            }
        }
        //#endregion
        else {
            let tipo_atenrior: Tipo = null;
            for (let i = 0; i < this.lista_exp.length; i++) {
                const acceso = this.lista_exp[i];
                let res: Object = null;

                if (acceso instanceof Identificador) {
                    let Ident: Identificador = <Identificador>acceso;
                    res = this.getTipoIdentficador(tipo_atenrior, Ident.getId(), ts);
                }

                if (res instanceof ErrorLup) {
                    return res;
                }

                tipo_atenrior = <Tipo>res;
            }
            return tipo_atenrior;
        }
    }

    /**
     * Método que retorna el tipo de un identificador o null Error si no existe
     * @param tipo_atenrior Tipo anterior de ser null se busca directo en la tabla de símbolos
     * @param id Identificador que se busca
     * @param ts Tabla de símbolos
     */
    private getTipoIdentficador(tipo_atenrior: Tipo, id: string, ts: TablaSimbJ): Object {
        //#region PRIMER ACCESO
        if (tipo_atenrior == null) {
            let variable: SimbVar = ts.BuscarVariable((<Identificador>this.lista_exp[0]).getId())
            if (variable == null) {
                return ts.GenerarError('No existe la variable ' + (<Identificador>this.lista_exp[0]).getId(), this.getFila(), this.getCol());
            }
            return variable.getTipo();
        }
        //#endregion
        else {
            //#region ID (STRCUCT) . ID
            if (tipo_atenrior.esStruct()) {
                let def: DefStruct = ts.BuscarStruct(tipo_atenrior.getNombreTipo())
                if (def == null) {
                    return ts.GenerarError('No existe la estructura ' + tipo_atenrior.getNombreTipo(), this.getFila(), this.getCol());
                }

                let tipo_atributo: Tipo = def.getAtributo(id);

                if (tipo_atributo == null) {
                    return ts.GenerarError('La estructura ' + tipo_atenrior.getNombreTipo() + ' no tiene ' + id, this.getFila(), this.getCol());
                }

                return tipo_atributo;
            }
            //#endregion
        }
    }

    //#endregion

    //#region TRADUCCION

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
            else if (this.lista_exp[0] instanceof CallFun) {
                (<CallFun>this.lista_exp[0]).Traducir(ts);
            }
            //#endregion
            //#region CALL FUN 2
            else if (this.lista_exp[0] instanceof CallFun2) {
                (<CallFun2>this.lista_exp[0]).Traducir(ts);
            }
            //#endregion
        } else {
            let tipo_atenrior: Tipo = null;
            for (let i = 0; i < this.lista_exp.length; i++) {
                const acceso = this.lista_exp[i];
                let res: Object = null;

                if (acceso instanceof Identificador) {
                    let Ident: Identificador = <Identificador>acceso;
                    res = this.TraducirIdentificadorGet(tipo_atenrior, Ident.getId(), ts);
                }
                tipo_atenrior = <Tipo>res;
            }
        }
    }

    public TraducirIdentificadorGet(tipo_anterior: Tipo, id: string, ts: TablaSimbJ): Tipo {
        //#region PRIMER ACCESO
        if (tipo_anterior == null) {
            let variable: SimbVar = ts.BuscarVariable(id);
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
            return variable.getTipo();
        }
        //#endregion
        else {
            //#region ID (STRCUCT) . ID
            if (tipo_anterior.esStruct()) {
                let def: DefStruct = ts.BuscarStruct(tipo_anterior.getNombreTipo())
                let pos: number = def.getPosAtributo(id);
                let atrib: Tipo = def.getAtributo(id);
                let temp = getTempAct();
                let t1 = genTemp();
                let tr = genTemp();

                concatCodigo(t1 + ' = ' + temp + ' + ' + pos + ';');
                concatCodigo(tr + ' = Heap[' + t1 + '];');
                ts.SacarTemporal(temp);
                ts.guardarTemporal(tr);

                return atrib;
            }
            //#endregion
        }

    }

    /**
     * Traduce un acceso para setear un valor
     * @param ts Tabla de simbolos
     */
    public TraducirAsig(ts: TablaSimbJ): void {
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
        } else {
            let tipo_atenrior: Tipo = null;
            for (let i = 0; i < this.lista_exp.length - 1; i++) {
                const acceso = this.lista_exp[i];
                let res: Object = null;

                if (acceso instanceof Identificador) {
                    let Ident: Identificador = <Identificador>acceso;
                    res = this.TraducirIdentificadorGet(tipo_atenrior, Ident.getId(), ts);
                }

                tipo_atenrior = <Tipo>res;
            }

            let ultimo_acceso: ExpresionJ = this.lista_exp[this.lista_exp.length - 1];
            if(ultimo_acceso instanceof Identificador){
                let temp: string = getTempAct();
                this.TraducirAsigAtributo(tipo_atenrior,temp, ultimo_acceso, ts);
            }

        }
    }

    private TraducirAsigAtributo(tipo: Tipo, apuntador: string ,ultimo_acceso: Identificador, ts: TablaSimbJ):void{
        if (tipo.esStruct()) {
            if (tipo.esStruct()) {
                let def: DefStruct = ts.BuscarStruct(tipo.getNombreTipo())
                let pos: number = def.getPosAtributo(ultimo_acceso.getId());
                let atrib: Tipo = def.getAtributo(ultimo_acceso.getId());


                let o: Object = this.exp.getTipo(ts);
                if(o instanceof ErrorLup){
                    ts.GenerarError('Asig: Hubo un error en la expresion', this.getFila(),this.getCol());
                    return;
                }

                let tipo_exp: Tipo = <Tipo>o;

                if(!atrib.esIgualA(tipo_exp) && !atrib.AplicaCasteo(tipo_exp)){
                    ts.GenerarError('Asig: Los tipo no coinciden',this.getFila(),this.getCol());
                    return;
                }


                this.exp.Traducir(ts);
                let tr: string = getTempAct();

                let t1: string = genTemp();

                concatCodigo(t1 + ' = ' + apuntador + ' + ' + pos + ';');
                concatCodigo('Heap[' + t1 + '] = ' + tr + ';');
                ts.SacarTemporal(tr);
                ts.SacarTemporal(apuntador);
            }
        }
    }

    //#endregion

}
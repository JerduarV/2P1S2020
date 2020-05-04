import { ExpresionJ } from './ExpresionJ';
import { Identificador } from './Identificador';
import { SimbVar } from '../TSJ/SimbVar';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { genTemp, concatCodigo, getTempAct, getEtiqueta } from 'src/app/Auxiliares/Utilidades';
import { Tipo } from '../TSJ/Tipo';
import { CallFun } from './CallFun';
import { CallFun2 } from './CallFun2';
import { DefStruct } from '../InstruccionJ/DefStruct';
import { AccesoArray } from './AccesoArray';

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
            } else if (this.lista_exp[0] instanceof AccesoArray) {
                let acceso: AccesoArray = <AccesoArray>this.lista_exp[0];
                return this.getTipoAccesoArray(null, acceso.getId(), ts);
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
                } else if (acceso instanceof AccesoArray) {
                    let array: AccesoArray = <AccesoArray>acceso;
                    res = this.getTipoAccesoArray(tipo_atenrior, array.getId(), ts);
                }else if(acceso instanceof CallFun){
                    let callfun: CallFun = <CallFun>acceso;
                    res = this.getTipoCallFun(tipo_atenrior, callfun, ts);
                }

                if (res instanceof ErrorLup) {
                    return res;
                }

                tipo_atenrior = <Tipo>res;
            }
            return tipo_atenrior;
        }
    }

    private getTipoCallFun(tipo_anterior: Tipo, llamada: CallFun, ts: TablaSimbJ):Object{

        //CUANOD LA LISTA DE ACCESOS EMPIEZA CON UNA LLAMADA
        if(tipo_anterior == null){
            return llamada.getTipo(ts);
        }
    }

    private getTipoAccesoArray(tipo_atenrior: Tipo, id: string, ts: TablaSimbJ): Object {
        //#region PRIMER ACCESO
        if (tipo_atenrior == null) {
            let variable: SimbVar = ts.BuscarVariable((<Identificador>this.lista_exp[0]).getId())
            if (variable == null) {
                return ts.GenerarError('No existe la variable ' + (<Identificador>this.lista_exp[0]).getId(), this.getFila(), this.getCol());
            }
            if (!variable.getTipo().soyArreglo()) {
                return ts.GenerarError(id + ' NO es un arreglo', this.getFila(), this.getCol());
            }

            return new Tipo(variable.getTipo().getNombreTipo(), 0);
        }
        //#endregion
        else {
            if (tipo_atenrior.esStruct()) {
                let def: DefStruct = ts.BuscarStruct(tipo_atenrior.getNombreTipo())
                if (def == null) {
                    return ts.GenerarError('No existe la estructura ' + tipo_atenrior.getNombreTipo(), this.getFila(), this.getCol());
                }

                let tipo_atributo: Tipo = def.getAtributo(id);

                if (tipo_atributo == null) {
                    return ts.GenerarError('La estructura ' + tipo_atenrior.getNombreTipo() + ' no tiene ' + id, this.getFila(), this.getCol());
                }

                if (!tipo_atributo.soyArreglo()) {
                    return ts.GenerarError('El atributo no es un arreglo ', this.getFila(), this.getCol());
                }
                console.log('es estructura');
                return new Tipo(tipo_atributo.getNombreTipo(), 0);
            }
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
                //console.log('me fui por aqui');
                (<CallFun>this.lista_exp[0]).Traducir(ts);
            }
            //#endregion
            //#region CALL FUN 2
            else if (this.lista_exp[0] instanceof CallFun2) {
                (<CallFun2>this.lista_exp[0]).Traducir(ts);
            }
            //#endregion
            //#region ARRAY
            else if (this.lista_exp[0] instanceof AccesoArray) {
                let acceso: AccesoArray = <AccesoArray>this.lista_exp[0];
                this.TraducirAccesoArrayGet(null, acceso.getId(), acceso.getExpIndex(), ts);
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
                } else if (acceso instanceof AccesoArray) {
                    let array: AccesoArray = <AccesoArray>acceso;
                    res = this.TraducirAccesoArrayGet(tipo_atenrior, array.getId(), array.getExpIndex(), ts);
                }else if(acceso instanceof CallFun){
                    let call: CallFun = <CallFun>acceso;
                    res = this.TraducirAccesoCallFun(tipo_atenrior, call,ts);
                }

                if (res == null) {
                    return;
                }
                tipo_atenrior = <Tipo>res;
            }
        }
    }

    private TraducirAccesoCallFun(tipo_anterior: Tipo, callFun: CallFun, ts: TablaSimbJ):Tipo{
        //SI LA LISTA DE ACCESOS EMPIEZA CON UNA LLAMADA
        if(tipo_anterior == null){
            callFun.Traducir(ts);
            return <Tipo>callFun.getTipo(ts);
        }else{
            
        }
    }

    public TraducirAccesoArrayGet(tipo_anterior: Tipo, id: string, exp_indice: ExpresionJ, ts: TablaSimbJ): Tipo {
        //#region PRIMER ACCESO
        if (tipo_anterior == null) {
            let variable: SimbVar = ts.BuscarVariable(id);
            if (variable == null) {
                return;
            }

            let tem_val: string;
            if (!variable.getEsGlobal()) {
                let temp: string = genTemp();
                tem_val = genTemp();
                concatCodigo(temp + ' = P + ' + variable.getPosicion() + ';');
                concatCodigo(tem_val + ' = Stack[' + temp + '];')
                ts.guardarTemporal(tem_val);
            } else {
                tem_val = genTemp();
                concatCodigo(tem_val + ' = Heap[' + variable.getPosicion() + '];');
                ts.guardarTemporal(tem_val);
            }

            let o: Object = exp_indice.getTipo(ts);
            if (o instanceof ErrorLup) {
                return null;
            }

            let tipo: Tipo = <Tipo>o;
            if (!tipo.isInteger()) {
                ts.GenerarError('Array: El indice debe ser entero', this.getFila(), this.getCol());
                return null;
            }

            exp_indice.Traducir(ts);
            let etqv: string = getEtiqueta();
            let etqf: string = getEtiqueta();
            let etqv2: string = getEtiqueta();
            let etqf2: string = getEtiqueta();
            let i: string = getTempAct();
            let t1: string = genTemp();
            let t2: string = genTemp();
            let t4: string = genTemp();
            let t3: string = genTemp();

            concatCodigo('if(' + i + ' < 0) goto ' + etqv + ';')
            concatCodigo('goto ' + etqf + ';')
            concatCodigo(etqv + ':');
            concatCodigo('E = 2;');
            concatCodigo(etqf + ':');
            concatCodigo(t4 + ' = Heap[' + tem_val + '];');
            concatCodigo('if(' + i + ' >= ' + t4 + ') goto ' + etqv2 + ';');
            concatCodigo('goto ' + etqf2 + ';');
            concatCodigo(etqv2 + ':');
            concatCodigo('E = 2;');
            concatCodigo(etqf2 + ':');

            concatCodigo(t1 + ' = ' + i + ' + 1;');
            concatCodigo(t2 + ' = ' + tem_val + ' + ' + t1 + ';');
            concatCodigo(t3 + ' = Heap[' + t2 + '];');

            ts.guardarTemporal(t3);
            ts.SacarTemporal(i);
            ts.SacarTemporal(tem_val);

            console.log('Se pudo acceder al arreglo');
            return new Tipo(variable.getTipo().getNombreTipo(), 0);
        }
        //#endregion
        else {
            //#region ID (STRCUCT) . ID[E]
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

                let o: Object = exp_indice.getTipo(ts);
                if (o instanceof ErrorLup) {
                    return null;
                }

                let tipo: Tipo = <Tipo>o;
                if (!tipo.isInteger()) {
                    ts.GenerarError('Array: El indice debe ser entero', this.getFila(), this.getCol());
                    return null;
                }

                exp_indice.Traducir(ts);
                let etqv: string = getEtiqueta();
                let etqf: string = getEtiqueta();
                let etqv2: string = getEtiqueta();
                let etqf2: string = getEtiqueta();
                let i: string = getTempAct();
                let t2: string = genTemp();
                let t4: string = genTemp();
                let t3: string = genTemp();

                concatCodigo('if(' + i + ' < 0) goto ' + etqv + ';')
                concatCodigo('goto ' + etqf + ';')
                concatCodigo(etqv + ':');
                concatCodigo('E = 2;');
                concatCodigo(etqf + ':');
                concatCodigo(t4 + ' = Heap[' + tr + '];');
                concatCodigo('if(' + i + ' >= ' + t4 + ') goto ' + etqv2 + ';');
                concatCodigo('goto ' + etqf2 + ';');
                concatCodigo(etqv2 + ':');
                concatCodigo('E = 2;');
                concatCodigo(etqf2 + ':');

                concatCodigo(t1 + ' = ' + i + ' + 1;');
                concatCodigo(t2 + ' = ' + tr + ' + ' + t1 + ';');
                concatCodigo(t3 + ' = Heap[' + t2 + '];');

                ts.guardarTemporal(t3);
                ts.SacarTemporal(i);
                ts.SacarTemporal(tr);

                console.log('Se pudo acceder al arreglo');
                return new Tipo(atrib.getNombreTipo(), 0);
            }
            //#endregion
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
            } else if (this.lista_exp[0] instanceof AccesoArray) {
                let acceso: AccesoArray = <AccesoArray>this.lista_exp[0];
                this.TraducirAsigArray(null, acceso.getId(), acceso.getExpIndex(), ts);
            }
        } else {
            let tipo_atenrior: Tipo = null;
            for (let i = 0; i < this.lista_exp.length - 1; i++) {
                const acceso = this.lista_exp[i];
                let res: Object = null;

                if (acceso instanceof Identificador) {
                    let Ident: Identificador = <Identificador>acceso;
                    res = this.TraducirIdentificadorGet(tipo_atenrior, Ident.getId(), ts);
                }else if(acceso instanceof AccesoArray){
                    let array: AccesoArray = <AccesoArray>acceso;
                    res = this.TraducirAccesoArrayGet(tipo_atenrior,array.getId(),array.getExpIndex(),ts);
                }

                tipo_atenrior = <Tipo>res;
            }

            let ultimo_acceso: ExpresionJ = this.lista_exp[this.lista_exp.length - 1];
            if (ultimo_acceso instanceof Identificador) {
                let temp: string = getTempAct();
                this.TraducirAsigAtributo(tipo_atenrior, temp, ultimo_acceso, ts);
            }else if(ultimo_acceso instanceof AccesoArray){
                let array: AccesoArray = <AccesoArray>ultimo_acceso;
                this.TraducirAsigArray(tipo_atenrior,array.getId(),array.getExpIndex(),ts);
            }

        }
    }

    private TraducirAsigAtributo(tipo: Tipo, apuntador: string, ultimo_acceso: Identificador, ts: TablaSimbJ): void {
        if (tipo.esStruct()) {
            if (tipo.esStruct()) {
                let def: DefStruct = ts.BuscarStruct(tipo.getNombreTipo())
                let pos: number = def.getPosAtributo(ultimo_acceso.getId());
                let atrib: Tipo = def.getAtributo(ultimo_acceso.getId());


                let o: Object = this.exp.getTipo(ts);
                if (o instanceof ErrorLup) {
                    ts.GenerarError('Asig: Hubo un error en la expresion', this.getFila(), this.getCol());
                    return;
                }

                let tipo_exp: Tipo = <Tipo>o;

                if (!atrib.esIgualA(tipo_exp) && !atrib.AplicaCasteo(tipo_exp)) {
                    ts.GenerarError('Asig: Los tipo no coinciden', this.getFila(), this.getCol());
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

    private TraducirAsigArray(tipo_anterior: Tipo, id: string, exp_indice: ExpresionJ, ts: TablaSimbJ): void {
        if (tipo_anterior == null) {
            let variable: SimbVar = ts.BuscarVariable(id);
            if (variable == null) {
                return;
            }

            let tem_val: string;
            if (!variable.getEsGlobal()) {
                let temp: string = genTemp();
                tem_val = genTemp();
                concatCodigo(temp + ' = P + ' + variable.getPosicion() + ';');
                concatCodigo(tem_val + ' = Stack[' + temp + '];')
                ts.guardarTemporal(tem_val);
            } else {
                tem_val = genTemp();
                concatCodigo(tem_val + ' = Heap[' + variable.getPosicion() + '];');
                ts.guardarTemporal(tem_val);
            }

            let o: Object = exp_indice.getTipo(ts);
            if (o instanceof ErrorLup) {
                return null;
            }

            let tipo: Tipo = <Tipo>o;

            if (!tipo.isInteger()) {
                ts.GenerarError('Array: El indice debe ser entero', this.getFila(), this.getCol());
                return null;
            }

            o = this.exp.getTipo(ts);

            if (o instanceof ErrorLup) {
                return null;
            }

            let tipo_exp_asig: Tipo = <Tipo>o;
            let tipo_contendio: Tipo = new Tipo(variable.getTipo().getNombreTipo(), 0);

            if (!tipo_contendio.esIgualA(tipo_exp_asig) && !tipo_contendio.AplicaCasteo(tipo_exp_asig)) {
                ts.GenerarError('Los tipos no coinciden', this.getFila(), this.getCol());
                return null;
            }

            exp_indice.Traducir(ts);
            let etqv: string = getEtiqueta();
            let etqf: string = getEtiqueta();
            let etqv2: string = getEtiqueta();
            let etqf2: string = getEtiqueta();
            let i: string = getTempAct();
            let t1: string = genTemp();
            let t2: string = genTemp();
            let t4: string = genTemp();

            concatCodigo('if(' + i + ' < 0) goto ' + etqv + ';')
            concatCodigo('goto ' + etqf + ';')
            concatCodigo(etqv + ':');
            concatCodigo('E = 2;');
            concatCodigo(etqf + ':');
            concatCodigo(t4 + ' = Heap[' + tem_val + '];');
            concatCodigo('if(' + i + ' >= ' + t4 + ') goto ' + etqv2 + ';');
            concatCodigo('goto ' + etqf2 + ';');
            concatCodigo(etqv2 + ':');
            concatCodigo('E = 2;');
            concatCodigo(etqf2 + ':');

            concatCodigo(t1 + ' = ' + i + ' + 1;');
            concatCodigo(t2 + ' = ' + tem_val + ' + ' + t1 + ';');

            this.exp.Traducir(ts);
            let texp: string = getTempAct();

            concatCodigo('Heap[' + t2 + '] = ' + texp + ';')

            ts.SacarTemporal(i);
            ts.SacarTemporal(tem_val);
            ts.SacarTemporal(texp);
            console.log('Se pudo asignar al arreglo');
        } else {
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

                let o: Object = exp_indice.getTipo(ts);
                if (o instanceof ErrorLup) {
                    return null;
                }

                let tipo: Tipo = <Tipo>o;
                if (!tipo.isInteger()) {
                    ts.GenerarError('Array: El indice debe ser entero', this.getFila(), this.getCol());
                    return null;
                }

                exp_indice.Traducir(ts);
                let etqv: string = getEtiqueta();
                let etqf: string = getEtiqueta();
                let etqv2: string = getEtiqueta();
                let etqf2: string = getEtiqueta();
                let i: string = getTempAct();
                let t2: string = genTemp();
                let t4: string = genTemp();

                let oe: Object = this.exp.getTipo(ts);;
                if(oe instanceof ErrorLup){
                    return null;
                }

                let tipo_asig: Tipo = <Tipo>oe;
                let tipo_contendio: Tipo = new Tipo(atrib.getNombreTipo(), 0);

                if(!tipo_contendio.esIgualA(tipo_asig) && !tipo_contendio.AplicaCasteo(tipo_asig)){
                    ts.GenerarError('Los tipos no coinciden',this.getFila(),this.getCol());
                    return null;
                }

                this.exp.Traducir(ts);
                let t3: string = getTempAct();

                concatCodigo('if(' + i + ' < 0) goto ' + etqv + ';')
                concatCodigo('goto ' + etqf + ';')
                concatCodigo(etqv + ':');
                concatCodigo('E = 2;');
                concatCodigo(etqf + ':');
                concatCodigo(t4 + ' = Heap[' + tr + '];');
                concatCodigo('if(' + i + ' >= ' + t4 + ') goto ' + etqv2 + ';');
                concatCodigo('goto ' + etqf2 + ';');
                concatCodigo(etqv2 + ':');
                concatCodigo('E = 2;');
                concatCodigo(etqf2 + ':');

                concatCodigo(t1 + ' = ' + i + ' + 1;');
                concatCodigo(t2 + ' = ' + tr + ' + ' + t1 + ';');
                concatCodigo('Heap[' + t2 + '] = ' + t3 + ';');

                ts.SacarTemporal(t3);
                ts.SacarTemporal(i);
                ts.SacarTemporal(tr);

                console.log('Se pudo setear al arreglo');
            }
        }
    }

    //#endregion

}
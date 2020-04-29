import { OperacionJ, TipoOpeJ } from './OperacionJ';
import { ExpresionJ } from '../ExpresionJ';
import { TablaSimbJ } from '../../TSJ/TablaSimbJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo, getTipoString, getTipoDouble } from '../../TSJ/Tipo';
import { genTemp, concatCodigo, getTempAct, getEtiqueta } from 'src/app/Auxiliares/Utilidades';
import { concat } from 'rxjs';

export class OpeArit extends OperacionJ {

    /**
     * Constructor de las Operaciones Aritméticas
     * @param t Tipo de la operación
     * @param izq Operador izquierdo
     * @param der Operador derecho
     * @param fila Fila en la que se encuentra
     * @param col Columan en la que se encuentra
     */
    constructor(t: TipoOpeJ, izq: ExpresionJ, der: ExpresionJ, fila: number, col: number) {
        super(t, izq, der, fila, col);
    }

    public getTipo(ts: TablaSimbJ): Object {
        if (this.getTipoOpe() == TipoOpeJ.NEGATIVO) {
            let tipoUnico: Object = this.getIzq().getTipo(ts);
            if (tipoUnico instanceof ErrorLup) {
                return tipoUnico;
            }
            let tipoU: Tipo = <Tipo>tipoUnico;
            if (tipoU.isNumerico()) {
                return tipoU;
            } else {
                return ts.GenerarError('No se puede usar el negativo en' + tipoU.getString(), this.getFila(), this.getCol());
            }
        }

        let izq: Object = this.getIzq().getTipo(ts);
        let der: Object = this.getDer().getTipo(ts);

        if (izq instanceof ErrorLup || der instanceof ErrorLup) {
            return izq instanceof ErrorLup ? izq : der;
        }

        let opIzq: Tipo = <Tipo>izq;
        let opDer: Tipo = <Tipo>der;

        if (this.getTipoOpe() == TipoOpeJ.SUMA) {
            return this.AnalizarSuma(ts, opIzq, opDer);
        } else if (this.getTipoOpe() == TipoOpeJ.RESTA) {
            return this.AnalizarResta(ts, opIzq, opDer);
        } else if (this.getTipoOpe() == TipoOpeJ.MULT) {
            return this.AnalizarResta(ts, opIzq, opDer);
        } else if (this.getTipoOpe() == TipoOpeJ.DIV) {
            return this.AnalizarDivision(ts, opIzq, opDer);
        } else if (this.getTipoOpe() == TipoOpeJ.POT) {
            return this.AnalizarPotencia(ts, opIzq, opDer);
        }else if(this.getTipoOpe() == TipoOpeJ.MOD){
            return this.AnalizarModulo(ts,opIzq,opDer);
        }

        return null;
    }

    /**
     * Analisis de la resta
     * @param ts Tabla de símbolos
     * @param opIzq Tipo operador izquierdo
     * @param opDer Tipo operador derecho
     */
    private AnalizarResta(ts: TablaSimbJ, opIzq: Tipo, opDer: Tipo): Object {
        if (opIzq.isInteger()) {
            if (opDer.isInteger()) {
                return opIzq;
            } else if (opDer.isDouble()) {
                return opDer;
            } else if (opDer.isChar()) {
                return opIzq;
            }
        } else if (opIzq.isDouble()) {
            if (opDer.isInteger()) {
                return opIzq;
            } else if (opDer.isDouble()) {
                return opIzq;
            } else if (opDer.isChar()) {
                return opIzq;
            }
        } else if (opIzq.isChar()) {
            if (opDer.isInteger()) {
                return opDer;
            } else if (opDer.isDouble()) {
                return opDer;
            } else if (opDer.isChar()) {
                return opIzq;
            }
        }

        return ts.GenerarError('No se puede restar ' + opIzq.getString() + ' con ' + opDer.getString(), this.getFila(), this.getCol());
    }

    /**
     * Analizar de la suma
     * @param ts Tabla se simbolos
     * @param opIzq tipo operador izquierdo
     * @param opDer tipo operador derecho
     */
    private AnalizarSuma(ts: TablaSimbJ, opIzq: Tipo, opDer: Tipo): Object {
        if (opIzq.isString() || opDer.isString()) {
            return getTipoString();
        }

        if (opIzq.isInteger()) {
            //INTEGER + INTEGER
            if (opDer.isInteger()) {
                return opIzq;
            }//INTEGER + DOUBLE
            else if (opDer.isDouble()) {
                return opDer;
            }//INTEGER + CHAR
            else if (opDer.isChar()) {
                return opIzq;
            }
        } else if (opIzq.isDouble()) {
            //DOUBLE + INTEGER
            if (opDer.isInteger()) {
                return opIzq;
            }//DOUBLE + DOUBLE
            else if (opDer.isDouble()) {
                return opIzq;
            }//DOUBLE + CHAR
            else if (opDer.isChar()) {
                return opIzq;
            }
        } else if (opIzq.isChar()) {
            //CHAR + INTEGER
            if (opDer.isInteger()) {
                return opDer;
            }//CHAR + DOUBLE
            else if (opDer.isDouble()) {
                return opDer;
            }//CHAR + CHAR
            else if (opDer.isChar()) {
                //return getTipoString();
            }
        }

        return ts.GenerarError('No se puede sumar ' + opIzq.getString() + ' con ' + opDer.getString(), this.getFila(), this.getCol());
    }

    /**
     * Análisis de la multiplicación
     * @param ts Tabla de Simbolos
     * @param opIzq Tipo operador izquierdo
     * @param opDer Tipo operador derecho
     */
    private AnalizarDivision(ts: TablaSimbJ, opIzq: Tipo, opDer: Tipo): Object {
        if ((opIzq.isNumerico() || opIzq.isChar()) || (opDer.isNumerico() || opDer.isChar())) {
            return getTipoDouble();
        }
        ts.GenerarError('No se puede multiplicar ' + opIzq.getString() + ' con ' + opDer.getString(), this.getFila(), this.getCol());
    }

    /**
     * Analisis del módulo
     * @param ts Tabla de símblos
     * @param opIzq Tipo del operador izquierdo
     * @param opDer Tipo del operador derecho
     */
    private AnalizarModulo(ts: TablaSimbJ, opIzq: Tipo, opDer: Tipo):Object{
        if (opIzq.isInteger() && opDer.isInteger()) {
            return opIzq;
        }
        ts.GenerarError('No se puede hacer el modulo de ' + opIzq.getString() + ' con ' + opDer.getString(), this.getFila(), this.getCol());
    }

    /**
     * Análisis para la potencia
     * @param ts Tabla de símbolos
     * @param opIzq Tipo del operador izquierdo
     * @param opDer Tipo del operador derecho
     */
    private AnalizarPotencia(ts: TablaSimbJ, opIzq: Tipo, opDer: Tipo): Object {
        if (opIzq.isInteger() && opDer.isInteger()) {
            return opIzq;
        }
        ts.GenerarError('No se puede elevar ' + opIzq.getString() + ' con ' + opDer.getString(), this.getFila(), this.getCol());
    }

    public Traducir(ts: TablaSimbJ): void {

        if(this.getTipo(ts) instanceof ErrorLup){
            return;
        }

        if (this.getTipoOpe() == TipoOpeJ.NEGATIVO) {
            this.TraducirNegativo(ts);
        } else if (this.getTipoOpe() == TipoOpeJ.SUMA) {
            this.TraducirSuma(ts);
        } else if (this.getTipoOpe() == TipoOpeJ.RESTA) {
            this.TraducirResta(ts);
        } else if (this.getTipoOpe() == TipoOpeJ.MULT) {
            this.TraducirMultiplicacion(ts);
        } else if (this.getTipoOpe() == TipoOpeJ.DIV) {
            this.TraducirDivision(ts);
        } else if (this.getTipoOpe() == TipoOpeJ.POT) {
            this.TraducirPotencia(ts);
        }else if(this.getTipoOpe() == TipoOpeJ.MOD){
            this.TraducirModulo(ts);
        }
    }

    /**
     * Traduce la suma
     * @param ts Tabla de símbolos
     */
    private TraducirSuma(ts: TablaSimbJ): void {

        let tipoIzq: Tipo = <Tipo>this.getIzq().getTipo(ts);
        let tipoDer: Tipo = <Tipo>this.getDer().getTipo(ts);

        if(tipoIzq.isString() || tipoDer.isString()){
            this.TraducirConcat(tipoIzq, tipoDer, ts);
            return;
        }

        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        let temp: string = genTemp();
        concatCodigo(temp + ' = ' + t1 + ' + ' + t2 + ';');
        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(temp);
    }

    private TraducirConcat(tipoIzq: Tipo, tipoDer: Tipo, ts: TablaSimbJ){

        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        if(tipoIzq.isString() && tipoDer.isString()){
            this.ConcatStringString(t1,t2,ts);
        }else if(tipoIzq.isString()){
            if(tipoDer.isBoolean()){
                //#region STRING + BOOLEAN
                let tempb: string = genTemp();
                let etqv: string = getEtiqueta();
                let etqf: string = getEtiqueta();
                ts.SacarTemporal(t1);
                ts.guardarTemporal(tempb);
                concatCodigo(tempb + ' = ' + ts.temp_false + ';');
                concatCodigo('if(' + t2 + ' == 1) goto ' + etqv + ';');
                concatCodigo('goto ' + etqf + ';')
                concatCodigo(etqv + ':');
                concatCodigo(tempb + ' = ' + ts.temp_true + ';')
                concatCodigo(etqf + ':');
                this.ConcatStringString(t1,tempb,ts);
                //#endregion
            }else if(tipoDer.isInteger()){
                //#region STRING + INT
                let tr: string = genTemp();
                concatCodigo('P = P + ' + ts.getTamanioFunTotal() + ';');
                concatCodigo(tr + ' = P + 1;');
                concatCodigo('Stack[' + tr + '] = ' + t2 + ';');
                concatCodigo('call jerduar_INTTOSTRING;');
                concatCodigo(t2 + ' = Stack[P];');
                concatCodigo('P = P - ' + ts.getTamanioFunTotal() + ';');
                this.ConcatStringString(t1,t2,ts);
                //#endregion
            }
        }else if(tipoDer.isString()){
            if(tipoIzq.isBoolean()){
                //#region BOOLEAN + STRING
                let tempb: string = genTemp();
                let etqv: string = getEtiqueta();
                let etqf: string = getEtiqueta();
                ts.SacarTemporal(t1);
                ts.guardarTemporal(tempb);
                concatCodigo(tempb + ' = ' + ts.temp_false + ';');
                concatCodigo('if(' + t1 + ' == 1) goto ' + etqv + ';');
                concatCodigo('goto ' + etqf + ';')
                concatCodigo(etqv + ':');
                concatCodigo(tempb + ' = ' + ts.temp_true + ';')
                concatCodigo(etqf + ':');
                this.ConcatStringString(tempb,t2,ts);
                //#endregion
            }else if(tipoIzq.isInteger()){
                //#region INT + STRING
                let tr: string = genTemp();
                concatCodigo('P = P + ' + ts.getTamanioFunTotal() + ';');
                concatCodigo(tr + ' = P + 1;');
                concatCodigo('Stack[' + tr + '] = ' + t1 + ';');
                concatCodigo('call jerduar_INTTOSTRING;');
                concatCodigo(t1 + ' = Stack[P];');
                concatCodigo('P = P - ' + ts.getTamanioFunTotal() + ';');
                this.ConcatStringString(t1,t2,ts);
                //#endregion
            }
        }
    }

    private ConcatStringString(tempIzq: string, tempDer: string, ts: TablaSimbJ):void{
        let t1: string = genTemp();
        let t2: string = genTemp();
        let tr: string = genTemp();
        concatCodigo('P = P + ' + ts.getTamanioFunTotal() + ';');
        concatCodigo(t1 + ' = P + 1;');
        concatCodigo('Stack[' + t1 + '] = ' + tempIzq + ';');
        concatCodigo(t2 +  ' = P + 2;');
        concatCodigo('Stack[' + t2 + '] = '  + tempDer + ';');
        concatCodigo('call jerduar_CONCAT;');
        concatCodigo(tr + ' = Stack[P];');
        concatCodigo('P = P - ' + ts.getTamanioFunTotal() + ';');

        ts.guardarTemporal(tr);
        ts.SacarTemporal(tempIzq);
        ts.SacarTemporal(tempDer);
    }

    /**
     * Traducción de la resta
     * @param ts Tabla de Símbolos
     */
    private TraducirResta(ts: TablaSimbJ): void {
        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        let temp: string = genTemp();
        concatCodigo(temp + ' = ' + t1 + ' - ' + t2 + ';');
        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(temp);
    }

    private TraducirNegativo(ts: TablaSimbJ): void {
        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();
        let temp: string = genTemp();
        concatCodigo(temp + ' = -' + t1 + ';');
        ts.SacarTemporal(t1);
        ts.guardarTemporal(temp);
    }

    /**
     * Traducción de la multiplicacion
     * @param ts Tabla de símbolos
     */
    private TraducirMultiplicacion(ts: TablaSimbJ): void {
        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        let temp: string = genTemp();
        concatCodigo(temp + ' = ' + t1 + ' * ' + t2 + ';');
        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(temp);
    }

    /**
     * Traducción de la división
     * @param ts Tabla de símbolos
     */
    private TraducirDivision(ts: TablaSimbJ): void {
        let etqv: string = getEtiqueta();
        let etqf: string = getEtiqueta();

        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();


        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        concatCodigo('if (' + t2 + ' == 0) goto ' + etqv + ';\ngoto ' + etqf + ';');
        concatCodigo(etqv + ':\nE = 1;\n' + etqf + ':');

        let temp: string = genTemp();
        concatCodigo(temp + ' = ' + t1 + ' / ' + t2 + ';');
        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(temp);
    }

    /**
     * Traducción de la potencia
     * @param ts Tabla de simbolos
     */
    private TraducirPotencia(ts: TablaSimbJ): void {
        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        let temp_pivote: string = genTemp(),
            base: string = genTemp(),
            exponente: string = genTemp();
        let temp: string = genTemp();

        let tam_fun_actual: number = ts.getTamanioFunTotal();

        concatCodigo('\n' + temp_pivote + ' = P + ' + tam_fun_actual + ';')
        concatCodigo(base + ' = ' + temp_pivote + ' + 1;');
        concatCodigo('Stack[' + base + '] = ' + t1 + ';');
        concatCodigo(exponente + ' = ' + temp_pivote + ' + 2;');
        concatCodigo('Stack[' + exponente + '] = ' + t2 + ';');
        concatCodigo('P = P + ' + tam_fun_actual + ';');
        concatCodigo('call jerduar_POTENCIA;')
        concatCodigo(temp + ' = Stack[P];');
        concatCodigo('P = P - ' + tam_fun_actual + ';\n');

        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(temp);
    }

    /**
     * Traducción modulo
     * @param ts Tabla de símbolos
     */
    private TraducirModulo(ts: TablaSimbJ){
        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        let temp: string = genTemp();

        concatCodigo(temp + ' = ' + t1 + ' % ' + t2 + ';');
        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(temp);
            
    }

}
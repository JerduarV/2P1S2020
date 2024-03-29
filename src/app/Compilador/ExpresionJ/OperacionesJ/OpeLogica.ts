import { OperacionJ, TipoOpeJ } from './OperacionJ';
import { ExpresionJ } from '../ExpresionJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo } from '../../TSJ/Tipo';
import { TablaSimbJ } from '../../TSJ/TablaSimbJ';
import { genTemp, concatCodigo, getTempAct, getEtiqueta } from 'src/app/Auxiliares/Utilidades';

export class OpeLogica extends OperacionJ {

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

    public getTipo(ts: import("../../TSJ/TablaSimbJ").TablaSimbJ): Object {

        if (this.getTipoOpe() == TipoOpeJ.NOT) {
            let tipoUnico: Object = this.getIzq().getTipo(ts);
            if (tipoUnico instanceof ErrorLup) {
                return tipoUnico;
            }
            let tipoU: Tipo = <Tipo>tipoUnico;
            if (tipoU.isBoolean()) {
                return tipoU;
            } else {
                return ts.GenerarError('No se puede negar ' + tipoU.getString(), this.getFila(), this.getCol());
            }
        }

        let izq: Object = this.getIzq().getTipo(ts);
        let der: Object = this.getDer().getTipo(ts);

        if (izq instanceof ErrorLup || der instanceof ErrorLup) {
            return izq instanceof ErrorLup ? izq : der;
        }

        let opIzq: Tipo = <Tipo>izq;
        let opDer: Tipo = <Tipo>der;

        if (!opIzq.isBoolean() || !opDer.isBoolean()) {
            return ts.GenerarError('Se esperaban operadores booleanos', this.getFila(), this.getCol());
        }
        return opIzq;

    }

    public Traducir(ts: import("../../TSJ/TablaSimbJ").TablaSimbJ): void {
        if(this.getTipo(ts) instanceof ErrorLup){
            return;
        }
        switch (this.getTipoOpe()) {
            case TipoOpeJ.AND:
                this.TraducirAnd(ts);
                break;
            case TipoOpeJ.OR:
                this.TraducirOr(ts);
                break;
            case TipoOpeJ.NOT:
                this.TraducirNot(ts);
                break;
            case TipoOpeJ.XOR:
                this.TraducirXor(ts);
                break;
        }
    }

    /**
     * Traducción del NOT
     * @param ts Tabla de símbolos
     */
    private TraducirNot(ts: TablaSimbJ): void {
        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        let etqv: string = getEtiqueta();
        let etqf: string = getEtiqueta();
        let etqsalida: string = getEtiqueta();

        let temp: string = genTemp();

        concatCodigo('if (' + t1 + ' == 1) goto ' + etqv + ';\ngoto ' + etqf + ';')
        concatCodigo(etqv + ':\n' + temp + ' = 0;\ngoto ' + etqsalida + ';')
        concatCodigo(etqf + ':\n' + temp + ' = 1;\n' + etqsalida + ':');
        ts.SacarTemporal(t1);
        ts.guardarTemporal(temp);
    }

    /**
     * Traducción del OR
     * @param ts Tabla de símbolos
     */
    public TraducirOr(ts: TablaSimbJ): void {
        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        let etqv: string = getEtiqueta();
        let etqf: string = getEtiqueta();
        let etqv2: string = getEtiqueta();
        let etqf2: string = getEtiqueta();
        let t3: string = genTemp();

        concatCodigo(t3 + ' = 0;')
        concatCodigo('if (' + t1 + ' == 1) goto ' + etqv + ';\ngoto ' + etqf + ';');
        concatCodigo(etqf + ':');
        concatCodigo('if (' + t2 + ' == 1) goto ' + etqv2 + ';\ngoto ' + etqf2 + ';');
        concatCodigo(etqv + ':\n' + etqv2 + ':\n' + t3 + ' = 1;\n' + etqf2 + ':');
        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(t3);
    }

    /**
     * Traducción del AND
     * @param ts Tabla de símbolos
     */
    public TraducirAnd(ts: TablaSimbJ): void {
        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        let etqv: string = getEtiqueta();
        let etqf: string = getEtiqueta();
        let etqv2: string = getEtiqueta();
        let etqf2: string = getEtiqueta();
        let t3: string = genTemp();

        concatCodigo(t3 + ' = 0;')
        concatCodigo('if (' + t1 + ' == 1) goto ' + etqv + ';\ngoto ' + etqf + ';');
        concatCodigo(etqv + ':');
        concatCodigo('if (' + t2 + ' == 1) goto ' + etqv2 + ';\ngoto ' + etqf2 + ';');
        concatCodigo(etqv2 + ':\n' + t3 + ' = 1;\n' + etqf + ':\n' + etqf2 + ':');

        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(t3);
    }

    /**
     * Traducción de la operación XOR
     * @param ts Tabla de símbolos
     */
    private TraducirXor(ts: TablaSimbJ): void {
        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        let etqv: string = getEtiqueta();
        let etqf: string = getEtiqueta();

        let temp: string = genTemp();
        concatCodigo(temp + ' = 0;')
        concatCodigo('if (' + t1 + ' <> ' + t2 + ') goto ' + etqv + ';\ngoto ' + etqf + ';');
        concatCodigo(etqv + ':\n' + temp + ' = 1;\n' + etqf + ':');

        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(temp);
    }

}
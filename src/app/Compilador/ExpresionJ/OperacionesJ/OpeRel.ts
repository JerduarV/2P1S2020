import { ExpresionJ } from '../ExpresionJ';
import { OperacionJ, TipoOpeJ } from './OperacionJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo, getTipoBool } from '../../TSJ/Tipo';
import { TablaSimbJ } from '../../TSJ/TablaSimbJ';
import { genTemp, concatCodigo, getTempAct, getEtiqueta } from 'src/app/Auxiliares/Utilidades';

export class OpeRel extends OperacionJ {

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
        let izq: Object = this.getIzq().getTipo(ts);
        let der: Object = this.getDer().getTipo(ts);

        if (izq instanceof ErrorLup || der instanceof ErrorLup) {
            return izq instanceof ErrorLup ? izq : der;
        }

        let opIzq: Tipo = <Tipo>izq;
        let opDer: Tipo = <Tipo>der;

        if (this.getTipoOpe() == TipoOpeJ.IGUALQUE || this.getTipoOpe() == TipoOpeJ.DIFERENTE) {
            return this.AnalizarIgualdad(ts, opIzq, opDer);
        } else if (this.getTipoOpe() == TipoOpeJ.IGUALREF) {
            if (opIzq.isString() && opDer.isString() || opIzq.soyArreglo() && opDer.soyArreglo()) {
                return getTipoBool();
            } else {
                return ts.GenerarError('No se puede comparar === entre ' + opIzq.getString() + ' y ' + opDer.getString(), this.getFila(), this.getCol());
            }
        } else {
            return this.AnalizarComparadores(ts, opIzq, opDer);
        }
    }

    public AnalizarComparadores(ts: TablaSimbJ, opIzq: Tipo, opDer: Tipo): Object {
        if (opIzq.soyArreglo() || opDer.soyArreglo()) {
            return ts.GenerarError('No se puede comparar ' + opIzq.getString() + ' con ' + opDer.getString(), this.getFila(), this.getCol());
        }

        if (opIzq.esIgualA(opDer)
            || opIzq.isNumerico() && opDer.isNumerico()
            || opIzq.isNumerico() && opDer.isChar()
            || opIzq.isChar() && opDer.isNumerico()) {
            return getTipoBool();
        }
        return ts.GenerarError('No se puede comparar ' + opIzq.getString() + ' con ' + opDer.getString(), this.getFila(), this.getCol());
    }

    public AnalizarIgualdad(ts: TablaSimbJ, opIzq: Tipo, opDer: Tipo): Object {
        if (!opIzq.soyArreglo() && !opDer.soyArreglo() && opIzq.esIgualA(opDer)) {
            return getTipoBool();
        }
        return ts.GenerarError('No se puede comparar ' + opIzq.getString() + ' con ' + opDer.getString(), this.getFila(), this.getCol());
    }

    public Traducir(ts: import("../../TSJ/TablaSimbJ").TablaSimbJ): void {
        if (this.getTipo(ts) instanceof ErrorLup) {
            return;
        }

        let tipoIzq: Tipo = <Tipo>this.getIzq().getTipo(ts);
        let tipoDer: Tipo = <Tipo>this.getDer().getTipo(ts);

        if ((this.getTipoOpe() == TipoOpeJ.IGUALQUE || this.getTipoOpe() == TipoOpeJ.DIFERENTE)
            && tipoIzq.isString() && tipoDer.isString()) {
            this.TraducirCompString(ts);
            return;
        }

        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        let t3: string = genTemp();
        concatCodigo(t3 + ' = 0;');

        let etqv: string = getEtiqueta();
        let etqf: string = getEtiqueta();

        concatCodigo('if(' + t1 + this.getSimbolo() + t2 + ') goto ' + etqv + ';\ngoto ' + etqf + ';');
        concatCodigo(etqv + ':\n' + t3 + ' = 1;\n' + etqf + ':');

        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(t3);
    }

    private TraducirCompString(ts: TablaSimbJ): void {
        this.getIzq().Traducir(ts);
        let t1: string = getTempAct();

        this.getDer().Traducir(ts);
        let t2: string = getTempAct();

        let t3: string = genTemp();
        let t4: string = genTemp();
        let t5: string = genTemp();
        let t6: string = genTemp();

        let etqv: string = getEtiqueta();
        let etqf: string = getEtiqueta();

        concatCodigo('P = P + ' + ts.getTamanioFunTotal() + ';');
        concatCodigo(t4 + ' = P + 1;');
        concatCodigo('Stack[' + t4 + '] = ' + t1 + ';')
        concatCodigo(t5 + ' = P + 2;');
        concatCodigo('Stack[' + t5 + '] = ' + t2 + ';');
        concatCodigo('call jerduar_COMPSTRING;');
        concatCodigo(t3 + ' = Stack[P];');
        concatCodigo('P = P - ' + ts.getTamanioFunTotal() + ';');

        concatCodigo(t6 + ' = 0;');
        concatCodigo('if(' + t3 + this.getSimbolo() + '1) goto ' + etqv + ';');
        concatCodigo('goto ' + etqf + ';');
        concatCodigo(etqv + ':');
        concatCodigo(t6 + ' = 1;');
        concatCodigo(etqf + ':');

        ts.SacarTemporal(t1);
        ts.SacarTemporal(t2);
        ts.guardarTemporal(t6);

    }

    public getSimbolo(): string {
        switch (this.getTipoOpe()) {
            case TipoOpeJ.MENOR:
                return ' < ';
            case TipoOpeJ.MAYOR:
                return ' > ';
            case TipoOpeJ.MAYORIGUAL:
                return ' >= ';
            case TipoOpeJ.MENORIGUAL:
                return ' <= ';
            case TipoOpeJ.IGUALREF:
            case TipoOpeJ.IGUALQUE:
                return ' == ';
            case TipoOpeJ.DIFERENTE:
                return ' <> ';
        }
    }
}
import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { Tipo } from '../TSJ/Tipo';
import { concatCodigo, getTempAct, genTemp, getEtiqueta } from 'src/app/Auxiliares/Utilidades';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';

export class Print extends InstruccionJ {

    private readonly exp: ExpresionJ;

    constructor(exp: ExpresionJ, fila: number, col: number) {
        super(null, fila, col);
        this.exp = exp;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        let o: Object = this.exp.getTipo(ts);
        if (o instanceof ErrorLup) {
            ts.GenerarError('Print: Error al evaluar la expresión', this.getFila(), this.getCol());
            return;
        }

        let tipo: Tipo = <Tipo>o;
        this.exp.Traducir(ts);
        let temp = getTempAct()
        if (tipo.isInteger()) {
            concatCodigo('print("%i",' + temp + ');');
            concatCodigo('print("%c",10);');
            ts.SacarTemporal(temp);
        } else if (tipo.isDouble()) {
            concatCodigo('print("%d",' + temp + ');');
            concatCodigo('print("%c",10);');
            ts.SacarTemporal(temp);
        } else if (tipo.isChar()) {
            concatCodigo('print("%c",' + temp + ');');
            concatCodigo('print("%c",10);');
            ts.SacarTemporal(temp);
        } else if (tipo.isString()) {
            this.LlamarPrintCad(temp, ts);
        } else if (tipo.isBoolean()) {
            this.PrintBoolean(temp,ts);
        }
    }

    private PrintBoolean(temp: string, ts: TablaSimbJ): void {
        let etqv: string = getEtiqueta();
        let etqf: string = getEtiqueta();
        let tr: string = genTemp();

        concatCodigo(tr + ' = ' + ts.temp_false + ';')
        concatCodigo('if(' + temp + ' == 1) goto ' + etqv + ';');
        concatCodigo('goto ' + etqf + ';')
        concatCodigo(etqv + ':');
        concatCodigo(tr + ' = ' + ts.temp_true + ';');
        concatCodigo(etqf + ':');

        ts.SacarTemporal(temp);
        ts.guardarTemporal(tr);

        this.LlamarPrintCad(tr,ts);
    }

    private LlamarPrintCad(temp: string, ts: TablaSimbJ): void {
        concatCodigo('P = P + ' + ts.getTamanioFunTotal() + ';');
        let t1: string = genTemp();
        concatCodigo(t1 + ' = P + 1;');
        concatCodigo('Stack[' + t1 + '] = ' + temp + ';');
        concatCodigo('call jerduar_PRINT;');
        concatCodigo('P = P - ' + ts.getTamanioFunTotal() + ';');
        ts.SacarTemporal(temp);
    }

}
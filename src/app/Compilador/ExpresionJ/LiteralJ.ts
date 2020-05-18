import { ExpresionJ } from './ExpresionJ';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';
import { Tipo, DOUBLE, CHAR, INT, BOOL, STRING } from '../TSJ/Tipo';
import { concatCodigo, genTemp, getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';

export enum TipoLit {
    LIT_CHAR,
    LIT_INT,
    LIT_DOUBLE,
    LIT_STRING,
    LIT_TRUE,
    LIT_FALSE
}

export class LiteralJ extends ExpresionJ {

    private readonly val: Object;

    private readonly tipo: TipoLit;

    constructor(v: Object, t: TipoLit, fila: number, col: number) {
        super(fila, col);
        this.val = v;
        this.tipo = t;
    }

    public getTipo(ts: TablaSimbJ): Object {
        switch (this.tipo) {
            case TipoLit.LIT_CHAR:
                return new Tipo(CHAR, 0);
            case TipoLit.LIT_INT:
                return new Tipo(INT, 0);
            case TipoLit.LIT_DOUBLE:
                return new Tipo(DOUBLE, 0);
            case TipoLit.LIT_FALSE:
            case TipoLit.LIT_TRUE:
                return new Tipo(BOOL, 0);
            case TipoLit.LIT_STRING:
                return new Tipo(STRING, 0);
        }
    }


    public Traducir(ts: TablaSimbJ): void {
        let temp: string = genTemp();
        switch (this.tipo) {
            case TipoLit.LIT_CHAR:
                let c: string = this.ProcesarChar(this.val.toString());
                concatCodigo(temp + ' = ' + c.charCodeAt(0) + ';');
                ts.guardarTemporal(temp);
                break;
            case TipoLit.LIT_INT:
                concatCodigo(temp + ' = ' + this.val + ';');
                ts.guardarTemporal(temp);
                break;
            case TipoLit.LIT_DOUBLE:
                concatCodigo(temp + ' = ' + this.val + ';');
                ts.guardarTemporal(temp);
                break;
            case TipoLit.LIT_FALSE:
                concatCodigo(temp + ' = 0;');
                ts.guardarTemporal(temp);
                break;
            case TipoLit.LIT_TRUE:
                concatCodigo(temp + ' = 1;');
                ts.guardarTemporal(temp);
                break;
            case TipoLit.LIT_STRING:
                let valor: string = this.val.toString().substring(1, this.val.toString().length - 1);
                valor = valor.replace(/\\t/g, '\t');
                valor = valor.replace(/\\n/g, '\n');
                valor = valor.replace(/\\r/g, '\r');
                valor = valor.replace(/\\"/g, '"');
                valor = valor.replace(/\\\\/g, '\\');
                this.TraducirStringLit(valor, ts);
                break;
        }
    }

    private TraducirStringLit(val: string, ts: TablaSimbJ) {
        let temp: string = genTemp();
        concatCodigo(temp + ' = H;');
        concatCodigo('Heap[H] = ' + val.length + ';');
        concatCodigo('H = H + 1;');
        for (let i = 0; i < val.length; i++) {
            concatCodigo('Heap[H] = ' + val.charCodeAt(i) + ';');
            concatCodigo('H = H + 1;');
        }
        ts.guardarTemporal(temp);
    }

    private ProcesarChar(val: string): string {
        if (this.val.toString() == "'\\n'") {
            return '\n'
        }
        else if (this.val.toString() == "'\\t'") {
            return '\t'
        }
        else if (this.val.toString() == "'\\r'") {
            return '\r'

        }
        else if (this.val.toString() == "'\\0'") {
            return '\0';
        }
        else {
            return val.substring(1, val.length - 1);
        }
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo(this.Escapar(this.val.toString()));
        conectarNodo(padre, n);
    }

    private Escapar(cadena: string): string {

        if (this.tipo == TipoLit.LIT_STRING) {
            cadena = cadena.toString().substring(1, cadena.toString().length - 1);
        }

        cadena = cadena.replace("\\", "\\\\");
        cadena = cadena.replace("\"", '\"');
        cadena = cadena.replace("\n", "\\\\n");
        cadena = cadena.replace("\t", "\\\\t");
        cadena = cadena.replace("\r", "\\\\r");
        return cadena;
    }

}
import { ExpresionJ } from './ExpresionJ';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';
import { Tipo } from '../TSJ/Tipo';
import { concatCodigo, genTemp } from '../CompiladorJ';

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

    public Analizar(ts: TablaSimbJ): Object {
        switch (this.tipo) {
            case TipoLit.LIT_CHAR:
                return new Tipo('CHAR', 0);
            case TipoLit.LIT_INT:
                return new Tipo('INT', 0);
            case TipoLit.LIT_DOUBLE:
                return new Tipo('DOUBLE', 0);
            case TipoLit.LIT_FALSE:
            case TipoLit.LIT_TRUE:
                return new Tipo('', 0);
            case TipoLit.LIT_STRING:
                return new Tipo('STRING', 0);
        }
    }
    public Traducir(): void {
        let temp: string = genTemp();
        switch (this.tipo) {
            case TipoLit.LIT_CHAR:
                let c: string = this.ProcesarChar(this.val.toString());
                
                concatCodigo(temp + '=' + c.charCodeAt(0) + ';');
                break;
            case TipoLit.LIT_INT:
                concatCodigo(temp + '=' + this.val + ';');
                break;
            case TipoLit.LIT_DOUBLE:
                concatCodigo(temp + '=' + this.val + ';');
                break;
            case TipoLit.LIT_FALSE:
                concatCodigo(temp + ' = 0;');
                break;
            case TipoLit.LIT_TRUE:
                concatCodigo(temp + ' = 1;');
                break;
            case TipoLit.LIT_STRING:

        }
    }

    private ProcesarChar(val: string):string{
        if(this.val.toString() == "'\\n'"){
            return '\n'
        }
        if(this.val.toString() == "'\\t'"){
            return '\t'
        }
        if(this.val.toString() == "'\\r'"){
            return '\r'
        }else{
            return val.substring(1,val.length-1);

        }

    }

}
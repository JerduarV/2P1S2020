import { ExpresionJ } from './ExpresionJ';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';

export enum TipoLit{
    LIT_CHAR,
    LIT_INT,
    LIT_DOUBLE,
    LIT_STRING,
    LIT_TRUE,
    LIT_FALSE
}

export class LiteralJ extends ExpresionJ{

    private readonly val: Object;

    private readonly tipo: TipoLit;

    constructor(v: Object, t: TipoLit, fila: number, col: number){
        super(fila, col);
        this.val = v;
        this.tipo = t;
    }

    public Analizar(ts: TablaSimbJ): Object {
        switch(this.tipo){
            case TipoLit.LIT_CHAR:
                return 'CHAR';
            case TipoLit.LIT_INT:
                return 'INT';
            case TipoLit.LIT_DOUBLE:
                return 'DOUBLE';
            case TipoLit.LIT_FALSE:
            case TipoLit.LIT_TRUE:
                return 'BOOL';
            case TipoLit.LIT_STRING:
                return 'STRING';
        }
    }
    public Traducir(): void {
        throw new Error("Method not implemented.");
    }

}
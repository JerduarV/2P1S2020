import { ExpresionJ } from '../ExpresionJ';
import { getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';

export enum TipoOpeJ {
    SUMA,
    RESTA,
    MULT,
    DIV,
    POT,
    MOD,
    NEGATIVO,

    MAYOR,
    MENOR,
    MENORIGUAL,
    MAYORIGUAL,
    IGUALQUE,
    IGUALREF,
    DIFERENTE,

    AND,
    OR,
    XOR,
    NOT
}

export abstract class OperacionJ extends ExpresionJ {

    private readonly OpeIzq: ExpresionJ;

    private readonly OpeDer: ExpresionJ;

    private readonly tipo: TipoOpeJ;

    constructor(t: TipoOpeJ, izq: ExpresionJ, der: ExpresionJ, fila: number, col: number) {
        super(fila, col);
        this.tipo = t;
        this.OpeIzq = izq;
        this.OpeDer = der;
    }

    public getTipoOpe(): TipoOpeJ {
        return this.tipo;
    }

    public getIzq(): ExpresionJ {
        return this.OpeIzq;
    }

    public getDer(): ExpresionJ {
        return this.OpeDer;
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo(this.getSimboloDot());
        conectarNodo(padre, n);
        if (this.tipo == TipoOpeJ.NEGATIVO || this.tipo == TipoOpeJ.NOT) {
            this.OpeIzq.dibujar(n);
        } else {
            this.OpeIzq.dibujar(n);
            this.OpeDer.dibujar(n);
        }
    }

    private getSimboloDot(): string {
        switch (this.getTipoOpe()) {
            case TipoOpeJ.AND:
                return "&&";
            case TipoOpeJ.OR:
                return "||";
            case TipoOpeJ.DIFERENTE:
                return "!=";
            case TipoOpeJ.DIV:
                return "/";
            case TipoOpeJ.IGUALQUE:
                return "==";
            case TipoOpeJ.IGUALREF:
                return '===';
            case TipoOpeJ.MAYOR:
                return ">";
            case TipoOpeJ.MAYORIGUAL:
                return ">=";
            case TipoOpeJ.MENOR:
                return "<";
            case TipoOpeJ.MENORIGUAL:
                return "<=";
            case TipoOpeJ.MOD:
                return "%%";
            case TipoOpeJ.MULT:
                return "*";
            case TipoOpeJ.RESTA:
            case TipoOpeJ.NEGATIVO:
                return "-";
            case TipoOpeJ.NOT:
                return "!";
            case TipoOpeJ.POT:
                return "^^";
            case TipoOpeJ.XOR:
                return '^';
            default:
                return "+";
        }
    }

}
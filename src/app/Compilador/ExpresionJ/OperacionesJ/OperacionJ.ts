import { ExpresionJ } from '../ExpresionJ';

export enum TipoOpeJ{
    SUMA,
    RESTA,
    MULT,
    DIV,
    POT,
    MOD
}

export abstract class OperacionJ extends ExpresionJ{
    
    private readonly OpeIzq: ExpresionJ;

    private readonly OpeDer: ExpresionJ;

    private readonly tipo: TipoOpeJ;

    constructor(t: TipoOpeJ, izq: ExpresionJ, der: ExpresionJ, fila: number, col: number ){
        super(fila,col);
        this.tipo = t;
        this.OpeIzq = izq;
        this.OpeDer = der;
    }

}
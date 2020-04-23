import { TablaSimbJ } from '../TSJ/TablaSimbJ';

export abstract class NodoASTJ{

    private readonly fila: number;
    private readonly col: number;

    constructor(fila: number, col: number){
        this.fila = fila;
        this.col = col;
    }

    public abstract Analizar(ts: TablaSimbJ):Object;

    public abstract Traducir():void;

    public getFila():number{
        return this.fila;
    }

    public getCol():number{
        return this.col;
    }

}
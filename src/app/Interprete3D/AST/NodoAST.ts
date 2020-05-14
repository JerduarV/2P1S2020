export abstract class NodoAST{

    private fila: number;
    private col: number;

    private indice: number;

    constructor(fila: number, columna: number){
        this.fila = fila;
        this.col = columna;
    }

    public getFila():number{
        return this.fila;
    }

    public getCol():number{
        return this.col;
    }
}
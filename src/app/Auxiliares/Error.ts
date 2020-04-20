export class ErrorLup{

    private readonly columna: number;
    private readonly fila: number;
    private readonly descripcion: string;
    private readonly tipo: string;

    constructor(fila: number, col: number, desc: string, tipo: string){
        this.columna = col;
        this.fila = fila;
        this.descripcion = desc;
        this.tipo = tipo;
    }

    public getFila():number{
        return this.fila;
    }

    public getColumna():number{
        return this.columna;
    }

    public getDescripcion():string{
        return this.descripcion;
    }

    public getTipo():string{
        return this.tipo;
    }

}
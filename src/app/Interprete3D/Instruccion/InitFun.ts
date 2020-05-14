import { Instruccion } from './Instruccion';

export class InitFun extends Instruccion{
    private id: string;

    constructor(id: string, fila: number, col: number){
        super(fila,col);
        this.id = id;
    }

    public Escribir(): void {
        throw new Error("Method not implemented.");
    }
}
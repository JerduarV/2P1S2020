import { Instruccion } from './Instruccion';

export class DecArray extends Instruccion{
    private id: string;

    constructor(id: string, col: number, fila: number){
        super(fila, col);
        this.id = id;
    }
}
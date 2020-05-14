import { Instruccion } from './Instruccion';

export class EndFun extends Instruccion {
    constructor(fila: number, col: number) {
        super(fila, col);
    }

}
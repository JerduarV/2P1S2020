import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';

export class Print extends Instruccion {

    /**
     * Tipo de la impresión:
     * %d decimal
     * %c caracter
     * %i entero
     */
    private readonly tipo: string;

    /**
     * Expresión a imprimir
     */
    private readonly exp: Expresion;

    constructor(t: string, e: Expresion, fila: number, col: number) {
        super(fila, col);
        this.exp = e;
        this.tipo = t;
    }

    public Escribir(): void {
        throw new Error("Method not implemented.");
    }

}
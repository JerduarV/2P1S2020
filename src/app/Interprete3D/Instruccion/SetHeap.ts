import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';

export class SetHeap extends Instruccion{

    /**
     * Expresión que indica la posición a acceder
     */
    private readonly i: Expresion;

    /**
     * Valor a asignar
     */
    private readonly val: Expresion;

    /**
     * Constructor de la Expresión AccesoHeap | HEAP[E]
     * @param i Indice
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(i: Expresion, v: Expresion, fila: number, col: number){
        super(fila,col);
        this.i = i;
        this.val = v;
    }

    public Escribir(): void {
        throw new Error("Method not implemented.");
    }

}
import { Expresion } from './Expresion';

export class AccesoHeap extends Expresion {

    /**
     * Expresión que indica la posición a acceder
     */
    private readonly i: Expresion;

    /**
     * Constructor de la Expresión AccesoHeap | HEAP[E]
     * @param i Indice
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(i: Expresion, fila: number, col: number) {
        super(fila, col);
        this.i = i;
    }

    public getCadena(): string {
        return 'Heap[' + this.i.getCadena() + ']';
    }


}
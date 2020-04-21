import { Expresion } from './Expresion';

export class AccesoStack extends Expresion{
    /**
     * Expresión que indica la posición a acceder
     */
    private readonly i: Expresion;

    /**
     * Constructor de la Expresión AccesoStack | STACK[E]
     * @param i Indice
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(i: Expresion, fila: number, col: number){
        super(fila,col);
        this.i = i;
    }

    Resolver(ts: import("../TS/TablaSimbolos").TablaSimbolos): Object {
        let P: number = <number>this.i.Resolver(ts);
        return ts.getStack(P);
    }
}
import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';

export class SetStack extends Instruccion{

    /**
     * Expresión que indica la posición a acceder
     */
    private readonly i: Expresion;

    /**
     * Valor a asignar
     */
    private readonly val: Expresion;

    /**
     * Constructor de la Expresión AccesoStack | STACK[E]
     * @param i Indice
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(i: Expresion, v: Expresion, fila: number, col: number){
        super(fila,col);
        this.i = i;
        this.val = v;
    }

    public Ejecutar(ts: import("../TS/TablaSimbolos").TablaSimbolos): Object {
        let H: number = <number>this.i.Resolver(ts);
        let v: number = <number>this.val.Resolver(ts);
        ts.setStack(H,v);
        return null;
    }

}
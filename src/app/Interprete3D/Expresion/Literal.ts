import { Expresion } from './Expresion';

export class Literal extends Expresion{

    /**
     * Valor literal
     */
    private valor:Object;

    /**
     * Constructor de la clase Literal
     * @param val Valor literal de tipo numérico
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(val: Object, fila: number, col:number){
        super(fila, col);
        this.valor = val;
    }


}
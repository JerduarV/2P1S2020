import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';

export class Asignacion extends Instruccion{

    /**
     * Id de la variable a asignar
     */
    private readonly id: string;

    /**
     * Expresión que se asignará
     */
    private readonly exp: Expresion;

    /**
     * Constructor de la Instrucción Asignación de la forma id = exp
     * @param id Identificador de la variable a modificar
     * @param e Expresión que se asignará
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(id: string, e: Expresion, fila: number, col: number){
        super(fila,col);
        this.id = id;
        this.exp = e;
    }

    public Ejecutar(ts: import("../TS/TablaSimbolos").TablaSimbolos): Object {
        let val: Object = this.exp.Resolver(ts);
        ts.setValorVar(this.id, Number(val));
        return null;
    }

}
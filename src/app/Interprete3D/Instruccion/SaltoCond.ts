import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';

export class SaltoCond extends Instruccion{

    /**
     * Condicón del salto
     */
    private readonly cond: Expresion;

    /**
     * Etiqueta a la que salta
     */
    private readonly lb: string;

    /**
     * Constructor del Salto Condicional
     * @param c Condición
     * @param lb Etiqueta
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(c: Expresion, lb: string, fila: number, col:number){
        super(fila,col);
        this.cond = c;
        this.lb = lb;
    }

    public Ejecutar(ts: import("../TS/TablaSimbolos").TablaSimbolos): Object {
        let c: boolean = <boolean>this.cond.Resolver(ts);
        return c ? ts.getLabel(this.lb) : null;
    }

}
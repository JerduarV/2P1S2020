import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';

export class SaltoCond extends Instruccion{

    /**
     * Condicón del salto
     */
    public readonly cond: Expresion;

    /**
     * Etiqueta a la que salta
     */
    public readonly lb: string;

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

    public Escribir(): string {
        return 'if(' + this.cond.getCadena() + ') goto ' + this.lb + ';\n';
    }

}
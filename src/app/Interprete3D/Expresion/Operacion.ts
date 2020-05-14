import { Expresion } from './Expresion';

export enum TipoOpe {
    SUMA,
    RESTA,
    MULT,
    DIV,
    MOD,
    NEGATIVO,
    MAYOR,
    MENOR,
    MAYORIGUAL,
    MENORIGUAL,
    IGUALQUE,
    DIFERENTE
}

export class Operacion extends Expresion {

    private tipo: TipoOpe;

    private ExpIzq: Expresion;
    private ExpDer: Expresion;

    /**
     * Constructor de la clase Operacion
     * @param t Tipo de la expresión
     * @param izq Operador izquierdo
     * @param der Operador derecho
     * @param fila Fila donde se encuentra
     * @param col Columna donde se encuentra
     */
    constructor(t: TipoOpe, izq: Expresion, der: Expresion, fila: number, col: number) {
        super(fila, col);
        this.ExpDer = der;
        this.ExpIzq = izq;
        this.tipo = t;
    }

    public getCadena(): string {
        throw new Error("Method not implemented.");
    }

}
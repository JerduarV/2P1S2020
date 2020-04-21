import { Expresion } from './Expresion';
import { TablaSimbolos } from '../TS/TablaSimbolos';

export enum TipoOpe {
    SUMA,
    RESTA,
    MULT,
    DIV,
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

    Resolver(ts: TablaSimbolos): Object {

        let opIzq: number = <number>this.ExpIzq.Resolver(ts);

        if(this.tipo == TipoOpe.NEGATIVO){
            return -1 * opIzq;
        }

        let opDer: number = <number>this.ExpDer.Resolver(ts);

        switch (this.tipo) {
            case TipoOpe.SUMA:
                return opIzq + opDer;
            case TipoOpe.RESTA:
                return opIzq - opDer;
            case TipoOpe.MULT:
                return opIzq * opDer;
            case TipoOpe.DIV:
                return opIzq / opDer;
            case TipoOpe.MENOR:
                return opIzq < opDer;
            case TipoOpe.MAYOR:
                return opIzq > opDer;
            case TipoOpe.MENORIGUAL:
                return opIzq <= opDer;
            case TipoOpe.MAYORIGUAL:
                return opIzq >= opDer;
            case TipoOpe.IGUALQUE:
                return opIzq == opDer;
            case TipoOpe.DIFERENTE:
                return opIzq != opDer;
        }
    }

}
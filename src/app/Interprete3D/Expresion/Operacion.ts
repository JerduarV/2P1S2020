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

    public tipo: TipoOpe;

    public ExpIzq: Expresion;
    public ExpDer: Expresion;

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
        if (this.tipo == TipoOpe.NEGATIVO) {
            return this.getSimbolo() + this.ExpIzq.getCadena()
        } else {
            return this.ExpIzq.getCadena() + ' ' + this.getSimbolo() + ' ' + this.ExpDer.getCadena();
        }
    }

    public getSimbolo(): string {
        switch (this.tipo) {
            case TipoOpe.SUMA:
                return '+';
            case TipoOpe.RESTA:
            case TipoOpe.NEGATIVO:
                return '-';
            case TipoOpe.MULT:
                return '*';
            case TipoOpe.DIV:
                return '/';
            case TipoOpe.MOD:
                return '%';
            case TipoOpe.MENOR:
                return '<';
            case TipoOpe.MAYOR:
                return '>';
            case TipoOpe.MENORIGUAL:
                return '<=';
            case TipoOpe.MAYORIGUAL:
                return '>=';
            case TipoOpe.IGUALQUE:
                return '==';
            case TipoOpe.DIFERENTE:
                return '<>';
        }
    }

}
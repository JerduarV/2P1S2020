import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';

export class Print extends Instruccion {

    /**
     * Tipo de la impresión:
     * %d decimal
     * %c caracter
     * %i entero
     */
    private readonly tipo: string;

    /**
     * Expresión a imprimir
     */
    private readonly exp: Expresion;

    constructor(t: string, e: Expresion, fila: number, col: number) {
        super(fila, col);
        this.exp = e;
        this.tipo = t;
    }

    public Ejecutar(ts: import("../TS/TablaSimbolos").TablaSimbolos): Object {

        let val: Number = <number>this.exp.Resolver(ts);

        switch (this.tipo) {
            case '%c':
                console.log(String.fromCharCode(val.valueOf()));
                break;
            case '%i':
                console.log(Math.floor(val.valueOf()).toString());
                break;
            case '%d':
                console.log(val);
                break;
        }

        return null;
    }

}
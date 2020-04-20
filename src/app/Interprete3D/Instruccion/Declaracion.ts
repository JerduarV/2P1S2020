import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';

export class Declaracion extends Instruccion{

    private identificador: string;
    private valor: Expresion;

    /**
     * Constructor de una declaración de variable
     * @param id Identificador de la variable
     * @param valor Valor que puede ser nudo
     * @param fila Fila en la que se encuentra
     * @param col Columan en la que se encuentra
     */
    constructor(id: string, valor: Expresion, fila: number, col: number){
        super(fila,col);
        this.identificador = id;
        this.valor = valor;
    }

    public Ejecutar(ts: import("../TS/TablaSimbolos").TablaSimbolos): Object {
        let val: Object = this.valor != null ? this.valor.Resolver(ts) : null;
        ts.InsertarVar(this.identificador,val);
        return null;
    }

}
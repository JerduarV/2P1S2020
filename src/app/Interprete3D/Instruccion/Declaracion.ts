import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';

export class Declaracion extends Instruccion{

    private identificadores: string[];

    /**
     * Constructor de una declaración de variable
     * @param id Identificador de la variable
     * @param valor Valor que puede ser nudo
     * @param fila Fila en la que se encuentra
     * @param col Columan en la que se encuentra
     */
    constructor(ids: string[], fila: number, col: number){
        super(fila,col);
        this.identificadores = ids;
    }

    public Escribir(): string {
        return ' var ' + this.identificadores.join(',') + ';\n';
    }


}
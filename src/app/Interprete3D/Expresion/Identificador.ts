import { Expresion } from './Expresion';

export class Identificador extends Expresion{

    private id: string;

    /**
     * Constructor de la Expresión Identificador
     * @param id Identificador de la variable
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(id: string, fila:number, col:number){
        super(fila,col);
        this.id = id;
    }

    public getCadena(): string {
        throw new Error("Method not implemented.");
    }
}
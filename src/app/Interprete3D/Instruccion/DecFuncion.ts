import { Instruccion } from './Instruccion';

export class DecFuncion extends Instruccion{

    /**
     * Identificador de la función
     */
    private readonly id: string;

    /**
     * Cuerpo de la función
     */
    private readonly cuerpo: [];

    /**
     * Constructor de la Definición de una función
     * @param id Identificador de la función
     * @param cuerpo Cuerpo de instrucciones
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(id: string, cuerpo: [], fila: number, col: number){
        super(fila,col);
        this.cuerpo = cuerpo;
        this.id = id;
    }

    public getCuerpo():[]{
        return this.cuerpo;
    }

    public getID():string{
        return this.id;
    }

    public Escribir(): string {
        return '';
    }

}
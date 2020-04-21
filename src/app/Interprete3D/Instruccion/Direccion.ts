import { Instruccion } from './Instruccion';

export class Direccion extends Instruccion{

    /**
     * Identificador de la etiqueta
     */
    private readonly id: string;

    /**
     * Constructor de una Direccion | Lx:
     * @param id Identificador de la etiqueta
     * @param fila Fila en la que se encuentra
     * @param col Columan en la que se encuentra
     */
    constructor(id: string, fila: number, col:number){
        super(fila,col);
        this.id = id;
    }

    public Ejecutar(ts: import("../TS/TablaSimbolos").TablaSimbolos): Object {
        return null;
    }

    /**
     * Retorna el id de la direccion
     */
    public getID():string{
        return this.id;
    }

}
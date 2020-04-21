import { Instruccion } from './Instruccion';

export class Direccion extends Instruccion{

    /**
     * Identificador de la etiqueta
     */
    private readonly id: string;

    public Ejecutar(ts: import("../TS/TablaSimbolos").TablaSimbolos): Object {
        throw new Error("Method not implemented.");
    }

}
import { Tipo } from './Tipo';

export class ParametroFormal {

    nombre: string;
    tipoDato: Tipo;

    constructor(nombre: string, tipo: Tipo) {
        this.nombre = nombre;
        this.tipoDato = tipo;
    }

    public getTipo():Tipo{
        return this.tipoDato;
    }
}
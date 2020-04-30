import { Tipo } from './Tipo';

export class ParametroFormal {

    nombre: string;
    tipoDato: Tipo;

    constructor(tipo: Tipo, nombre: string) {
        this.nombre = nombre;
        this.tipoDato = tipo;
    }

    public getTipo():Tipo{
        return this.tipoDato;
    }
}
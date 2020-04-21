import { Instruccion } from './Instruccion';

export class SaltoIC extends Instruccion{

    /**
     * Etiqueta a la que se satará
     */
    private readonly label: string;

    /**
     * Constructor de la Instrucción: Salto Incondicional
     * @param lb Nombre de la etiqueta
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(lb: string, fila: number, col: number){
        super(fila,col);
        this.label = lb;
    }

    public Ejecutar(ts: import("../TS/TablaSimbolos").TablaSimbolos): Object {
        let i:number = ts.getLabel(this.label);
        return i;
    }

}
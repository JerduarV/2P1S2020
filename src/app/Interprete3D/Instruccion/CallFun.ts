import { Instruccion } from './Instruccion';
import { SimboloFun } from '../TS/SimboloFun';
import { Llamada } from '../Llamada';

export class CallFun extends Instruccion {

    /**
     * Identificador de la función a ejecutar
     */
    private readonly id: string;

    /**
     * Constructor de la llamada a una función
     * @id Identificador de la función
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(id: string, fila: number, col: number) {
        super(fila, col);
        this.id = id;
    }


}
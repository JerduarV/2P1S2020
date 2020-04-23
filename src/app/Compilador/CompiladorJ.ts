import * as parser from 'src/Gramatica/GramaticaJSharp';
import { Consola } from '../Auxiliares/Consola';

let contador_etq: number = 0;
let contador_tempo: number = 0;
let temAct = 0;
let codigo_gen: string = '';

export function genTemp(): string {
    temAct = contador_tempo;
    return 't' + contador_tempo++;
}

export function getTempAct():string{
    return 't' + temAct;
}

export function getEtiqueta():string{
    return 'L' + contador_etq++;
}

export function concatCodigo(cod: string):void{
    codigo_gen += cod;
}

export class CompiladorJ {
    constructor() {

    }

    /**
     * Analiza la entrada de código J#
     * @param entradaJSharp Archivo de entrada
     */
    public Compilar(entrada3d: string, cons: Consola) {
        contador_etq = 0;
        contador_tempo = 0;
        temAct = 0;
        codigo_gen = '';

        try {

            let AST;
            //PARSEO
            AST = parser.parse(entrada3d);

            console.log(AST);


        } catch (error) {
            console.log(error);
        }
    }
}
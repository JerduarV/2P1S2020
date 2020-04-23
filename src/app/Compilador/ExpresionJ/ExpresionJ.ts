import { NodoASTJ } from '../ASTJ/NodoASTJ';

export abstract class ExpresionJ extends NodoASTJ{

    constructor(fila: number, col:number){
        super(fila, col);
    }
}
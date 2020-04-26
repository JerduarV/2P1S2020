import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';

export abstract class ExpresionJ extends NodoASTJ{

    public abstract getTipo(ts: TablaSimbJ):Object;

    constructor(fila: number, col:number){
        super(fila, col);
    }
}
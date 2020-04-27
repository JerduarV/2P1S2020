import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { NodoASTJ } from '../ASTJ/NodoASTJ';

export class For extends InstruccionJ{

    private readonly init: InstruccionJ;

    private readonly cond: ExpresionJ;

    private readonly actualizacion: NodoASTJ;

    constructor(init: InstruccionJ, cond: ExpresionJ, act: NodoASTJ, cuerpo: NodoASTJ[], fila: number, col: number){
        super(cuerpo, fila, col)
        this.init = init;
        this.cond = cond;
        this.actualizacion = act;
    }


    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        throw new Error("Method not implemented.");
    }

}
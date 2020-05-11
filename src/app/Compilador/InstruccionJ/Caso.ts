import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';

export class Caso extends InstruccionJ {
    private readonly exp: ExpresionJ;

    constructor(exp: ExpresionJ, cuerpo: NodoASTJ[], fila: number, col: number) {
        super(cuerpo, fila, col);
        this.exp = exp;
    }

    public Traducir(ts: TablaSimbJ): void {
        this.TraducirCuerpo(ts);
    }

    public getExp():ExpresionJ{
        return this.exp;
    }

    public dibujar(padre: string): void {
        throw new Error("Method not implemented.");
    }
}

import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';
import { conectarNodo, getIdNodo } from 'src/app/Auxiliares/Utilidades';

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
        if(this.exp == null){
            let n: string = getIdNodo('DEFAULT');
            conectarNodo(padre, n);
            this.DibujarCuerpo(n);
        }else{
            let n: string = getIdNodo('CASE');
            conectarNodo(padre, n);
            this.exp.dibujar(n);
            this.DibujarCuerpo(n);
        }
    }
}

import { InstruccionJ } from './InstruccionJ';
import { Acceso } from '../ExpresionJ/Acceso';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';

export class Asignacion extends InstruccionJ{

    private readonly L_Acceso: Acceso;

    private readonly exp: ExpresionJ;

    constructor(acc: Acceso, exp: ExpresionJ, fila: number, col: number){
        super(null,fila,col);
        this.L_Acceso = acc;
        this.exp = exp;
        this.L_Acceso.exp = exp;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        this.L_Acceso.Traducir(ts);
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('ASIG');
        conectarNodo(padre, n);

        this.L_Acceso.dibujar(n);
        this.exp.dibujar(n);
    }

}
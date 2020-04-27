import { InstruccionJ } from './InstruccionJ';
import { IF } from './IF';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { NewTablaLocal } from '../TSJ/TablaSimbJ';

export class Else extends InstruccionJ{

    private readonly IF: IF;

    public etiqueta_salida: string;

    constructor(cuerpo: NodoASTJ[], elseif: IF, fila: number, col: number){
        super(cuerpo, fila, col);
        this.IF = elseif;
        this.etiqueta_salida = null;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        if(this.IF == null){
            this.TraducirCuerpo(NewTablaLocal(ts));
        }else{
            this.IF.etiqueta_salida = this.etiqueta_salida;
            this.IF.Traducir(ts);
        }
    }

}
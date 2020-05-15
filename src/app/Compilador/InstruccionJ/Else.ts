import { InstruccionJ } from './InstruccionJ';
import { IF } from './IF';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { NewTablaLocal, TablaSimbJ } from '../TSJ/TablaSimbJ';
import { DeclaracionJ } from './DeclaracionJ';
import { DecFun } from './DecFun';
import { DefStruct } from './DefStruct';
import { getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';

export class Else extends InstruccionJ {

    private readonly IF: IF;

    public etiqueta_salida: string;

    constructor(cuerpo: NodoASTJ[], elseif: IF, fila: number, col: number) {
        super(cuerpo, fila, col);
        this.IF = elseif;
        this.etiqueta_salida = null;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        if (this.IF == null) {
            this.TraducirCuerpo(NewTablaLocal(ts));
        } else {
            this.IF.etiqueta_salida = this.etiqueta_salida;
            this.IF.Traducir(ts);
        }
    }

    public BuscarVariablesGlobales(lista_dec: DeclaracionJ[], ts: TablaSimbJ): void {
        if (this.IF == null) {
            super.BuscarVariablesGlobales(lista_dec, ts);
        } else {
            this.IF.BuscarVariablesGlobales(lista_dec, ts);
        }
    }

    public RecolectarStruct(lista: DefStruct[]): void {
        if (this.IF == null) {
            for (let i = 0; i < this.getCuerpo().length; i++) {
                if (this.getCuerpo()[i] instanceof InstruccionJ) {
                    (<InstruccionJ>this.getCuerpo()[i]).RecolectarStruct(lista);
                }
            }
        } else {
            this.IF.RecolectarStruct(lista);
        }
    }

    public DeterminarTamanioFuncion(funcion: DecFun): void {
        if (this.IF == null) {
            for (let i = 0; i < this.getCuerpo().length; i++) {
                if (this.getCuerpo()[i] instanceof InstruccionJ) {
                    (<InstruccionJ>this.getCuerpo()[i]).DeterminarTamanioFuncion(funcion);
                }
            }
        } else {
            this.IF.DeterminarTamanioFuncion(funcion);
        }
    }

    public dibujar(padre: string): void {
        if (this.IF == null) {
            let n: string = getIdNodo('ELSE');
            conectarNodo(padre, n);
            this.DibujarCuerpo(n);
        } else {
            this.IF.dibujar(padre);
        }
    }

}
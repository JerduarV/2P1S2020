import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';
import { DeclaracionJ } from './DeclaracionJ';
import { DecFun } from './DecFun';
import { DefStruct } from './DefStruct';
import { getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';

export abstract class InstruccionJ extends NodoASTJ{

    private readonly cuerpo: NodoASTJ[];

    constructor(cuper: NodoASTJ[], fila: number, col: number){
        super(fila,col);
        this.cuerpo = cuper;
    }

    /**
     * Método que busca las variables globales
     * @param lista_dec Lista para almecenar las variables globales
     */
    public BuscarVariablesGlobales(lista_dec: DeclaracionJ[]): void{
        if(this.cuerpo != null){
            for(let i = 0; i < this.cuerpo.length; i++){
                if(this.cuerpo[i] instanceof InstruccionJ){
                    (<InstruccionJ>this.cuerpo[i]).BuscarVariablesGlobales(lista_dec);
                }
            }
        }
    }

    /**
     * Método que determina el tamanio de una función
     * @param funcion Función de la que se requiere saber su tamanio
     */
    public DeterminarTamanioFuncion(funcion: DecFun):void{
        if(this.cuerpo != null){
            for(let i = 0; i < this.cuerpo.length; i++){
                if(this.cuerpo[i] instanceof InstruccionJ){
                    (<InstruccionJ>this.cuerpo[i]).DeterminarTamanioFuncion(funcion);
                }
            }
        }
    }

    public RecolectarStruct(lista: DefStruct[]):void{
        if(this.cuerpo != null){
            for(let i = 0; i < this.cuerpo.length; i++){
                if(this.cuerpo[i] instanceof InstruccionJ){
                    (<InstruccionJ>this.cuerpo[i]).RecolectarStruct(lista);
                }
            }
        }
    }

    public TraducirCuerpo(ts: TablaSimbJ):void{
        if(this.cuerpo == null){
            return;
        }
        for(let i = 0; i < this.cuerpo.length; i++){
            let n: NodoASTJ = this.cuerpo[i];
            //IGNORO LOS ESTRUCTS
            if(n.constructor.name == 'DefStruct'){
                continue;
            }
            n.Traducir(ts);
        }
    }

    /**
     * Función que dibuja el cuerpo de la instrucción si la tuviera
     * @param padre Identficador del padre
     */
    public DibujarCuerpo(padre):void {
        if (this.cuerpo != null) {
            let l: string = getIdNodo("LSENT");
            conectarNodo(padre, l);
            this.cuerpo.forEach(nodo => {
                if(nodo != null){
                    nodo.dibujar(l);
                }
            });
            
        }
    }

    public getCuerpo():NodoASTJ[]{
        return this.cuerpo;
    }

}
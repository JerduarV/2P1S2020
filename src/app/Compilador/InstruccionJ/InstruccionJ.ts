import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';
import { DeclaracionJ } from './DeclaracionJ';
import { DecFun } from './DecFun';

export abstract class InstruccionJ extends NodoASTJ{

    private readonly cuerpo: NodoASTJ[];

    constructor(cuper: NodoASTJ[], fila: number, col: number){
        super(fila,col);
        this.cuerpo = cuper;
    }

    public BuscarVariablesGlobales(lista_dec: DeclaracionJ[]): void{
        if(this.cuerpo != null){
            for(let i = 0; i < this.cuerpo.length; i++){
                if(this.cuerpo[i] instanceof InstruccionJ){
                    (<InstruccionJ>this.cuerpo[i]).BuscarVariablesGlobales(lista_dec);
                }
            }
        }
    }

    public DeterminarTamanioFuncion(funcion: DecFun):void{
        if(this.cuerpo != null){
            for(let i = 0; i < this.cuerpo.length; i++){
                if(this.cuerpo[i] instanceof InstruccionJ){
                    (<InstruccionJ>this.cuerpo[i]).DeterminarTamanioFuncion(funcion);
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
            n.Traducir(ts);
        }
    }

    public getCuerpo():NodoASTJ[]{
        return this.cuerpo;
    }

}
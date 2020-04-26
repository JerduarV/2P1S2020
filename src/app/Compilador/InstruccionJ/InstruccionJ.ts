import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { TablaSimbJ } from '../TSJ/TablaSimbJ';

export abstract class InstruccionJ extends NodoASTJ{

    private readonly cuerpo: NodoASTJ[];

    constructor(cuper: NodoASTJ[], fila: number, col: number){
        super(fila,col);
        this.cuerpo = cuper;
    }

    public  AnalizarCuerpo(ts: TablaSimbJ):Object{
        if(this.cuerpo == null){
            return null;
        }
        for(let i = 0; i < this.cuerpo.length; i++){
            let n: NodoASTJ = this.cuerpo[i];
            n.Analizar(ts);
        }
        return null;
    }

    public TraducirCuperpo(ts: TablaSimbJ):void{
        if(this.cuerpo == null){
            return;
        }
        for(let i = 0; i < this.cuerpo.length; i++){
            let n: NodoASTJ = this.cuerpo[i];
            n.Traducir(ts);
        }
    }

}
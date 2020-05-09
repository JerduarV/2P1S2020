import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { getEtiqueta, concatCodigo, getTempAct } from 'src/app/Auxiliares/Utilidades';
import { NewTablaLocal, TablaSimbJ } from '../TSJ/TablaSimbJ';
import { DecFun } from './DecFun';

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
        

        let etq_ini: string = getEtiqueta(),
        etq_sal: string = getEtiqueta(),
        etq_act: string = getEtiqueta(),
        etq_v: string = getEtiqueta(),
        etq_f: string = getEtiqueta();

        let local: TablaSimbJ = NewTablaLocal(ts);
        
        //SE ESCRIBE EL CÓDIGO DE LA INICIALIZACIÓN SI HUBIERA
        if(this.init != null){
            this.init.Traducir(local);
        }

        if(this.cond != null){
            let o: Object = this.cond.getTipo(local);
            if(o instanceof ErrorLup){
                ts.GenerarError('Se esperaba un expresión condicional',this.getFila(),this.getCol());
                return;
            }
        }

        concatCodigo(etq_ini + ':');
        
        //SE ESCRIBE EL CÓDIGO DE LA CONDICIÓN SI LA HUBIERA
        if(this.cond != null){
            this.cond.Traducir(local);
            let temp_cond: string = getTempAct();
            ts.SacarTemporal(temp_cond);

            concatCodigo('if(' + temp_cond + ' == 1) goto ' + etq_v + ';');
            concatCodigo('goto ' + etq_f + ';');
        }

        concatCodigo(etq_v + ':');

        local.display.insertar(etq_act,etq_sal);
        this.TraducirCuerpo(local);
        local.display.sacarEtiquetas();

        concatCodigo(etq_act + ':');

        if(this.actualizacion != null){
            this.actualizacion.Traducir(local);
        }

        concatCodigo('goto ' + etq_ini + ';');
        concatCodigo(etq_sal + ':');
        concatCodigo(etq_f + ':');

    }

    public DeterminarTamanioFuncion(funcion: DecFun): void {
        super.DeterminarTamanioFuncion(funcion);
        if(this.init != null){
            this.init.DeterminarTamanioFuncion(funcion);
        }
    }

}
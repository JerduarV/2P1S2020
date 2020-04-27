import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo } from '../TSJ/Tipo';
import { getEtiqueta, concatCodigo, getTempAct } from 'src/app/Auxiliares/Utilidades';
import { NewTablaLocal } from '../TSJ/TablaSimbJ';

export class DoWhile extends InstruccionJ {

    private readonly cond: ExpresionJ;

    constructor(cuerpo: NodoASTJ[], cond: ExpresionJ, fila: number, col: number) {
        super(cuerpo, fila, col);
        this.cond = cond;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        let o: Object = this.cond.getTipo(ts);
        if(o instanceof ErrorLup){
            return;
        }
        let tipo: Tipo = <Tipo>o;
        if(!tipo.isBoolean()){
            ts.GenerarError('Se esperaba un condicón booleana', this.getFila(), this.getCol());
            return;
        }
        console.log('Traduciento dowhile');
        let etq_ini: string = getEtiqueta(),
        etq_sal: string = getEtiqueta();

        ts.display.insertar(etq_ini,etq_sal);

        concatCodigo(etq_ini + ':');
        this.TraducirCuerpo(NewTablaLocal(ts));
        this.cond.Traducir(ts);
        let temp: string = getTempAct();
        concatCodigo('if(' + temp + ' == 1) goto ' + etq_ini + ';');
        concatCodigo(etq_sal + ':');

        ts.display.sacarEtiquetas();

    }

}
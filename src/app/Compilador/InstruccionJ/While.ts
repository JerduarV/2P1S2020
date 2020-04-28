import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { getTempAct, getEtiqueta, concatCodigo } from 'src/app/Auxiliares/Utilidades';
import { Tipo } from '../TSJ/Tipo';
import { NewTablaLocal } from '../TSJ/TablaSimbJ';

export class While extends InstruccionJ{

    private readonly cond: ExpresionJ;

    constructor(con: ExpresionJ, cuerpo: NodoASTJ[], fila: number, col: number){
        super(cuerpo, fila, col);
        this.cond = con;
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

        let etq_ini: string = getEtiqueta(),
        etq_sal: string = getEtiqueta(),
        etqv: string = getEtiqueta(),
        etqf: string = getEtiqueta();

        concatCodigo(etq_ini + ':');

        this.cond.Traducir(ts);
        let temp: string = getTempAct();
        ts.SacarTemporal(temp);
        ts.display.insertar(etq_ini, etq_sal);
        concatCodigo('if(' + temp + ' == 1) goto ' + etqv + ';');
        concatCodigo('goto ' + etqf + ';');
        concatCodigo(etqv + ':')
        this.TraducirCuerpo(NewTablaLocal(ts));
        concatCodigo('goto ' + etq_ini + ';')
        concatCodigo(etqf + ':');
        concatCodigo(etq_sal + ':');

        ts.display.sacarEtiquetas();
    }

}
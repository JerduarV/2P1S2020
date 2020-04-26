import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { getTempAct, getEtiqueta, concatCodigo } from 'src/app/Auxiliares/Utilidades';

export class While extends InstruccionJ{

    private readonly cond: ExpresionJ;

    constructor(con: ExpresionJ, cuerpo: NodoASTJ[], fila: number, col: number){
        super(cuerpo, fila, col);
        this.cond = con;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {

        let o: Object = this.cond.getTipo(ts);
        if(o instanceof ErrorLup){
            ts.GenerarError('Se esperaba un valor booleano',this.getFila(), this.getCol())
        }

        let etq_ini: string = getEtiqueta(),
        etq_sal: string = getEtiqueta(),
        etqv: string = getEtiqueta(),
        etqf: string = getEtiqueta();

        concatCodigo(etq_ini + ':');

        this.cond.Traducir(ts);
        let temp: string = getTempAct();

        ts.display.insertar(etq_ini, etq_sal);
        concatCodigo('if(' + temp + ' == 1) goto ' + etqv + ';');
        concatCodigo('goto ' + etqf + ';');
        concatCodigo(etqv + ':')
        this.TraducirCuperpo(ts);
        concatCodigo('goto ' + etq_ini + ';')
        concatCodigo(etqf + ':');
        concatCodigo(etq_sal + ':');

        ts.display.sacarEtiquetas();
    }

}
import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { Tipo } from '../TSJ/Tipo';
import { concatCodigo, getTempAct } from 'src/app/Auxiliares/Utilidades';

export class Print extends InstruccionJ{

    private readonly exp: ExpresionJ;

    constructor(exp: ExpresionJ, fila: number, col: number){
        super(null,fila,col);
        this.exp = exp;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        let o: Object = this.exp.getTipo(ts);
        if(o instanceof Error){
            ts.GenerarError('Print: Error al evaluar la expresión', this.getFila(),this.getCol());
            return;
        }

        let tipo: Tipo = <Tipo>o;
        this.exp.Traducir(ts);
        let temp = getTempAct()
        if(tipo.isInteger()){
            concatCodigo('print("%i",' + temp + ');');
            concatCodigo('print("%c",10);');
        }else if(tipo.isDouble()){
            concatCodigo('print("%d",' + temp + ');');
            concatCodigo('print("%c",10);');
        }else if(tipo.isChar()){
            concatCodigo('print("%c",' + temp + ');');
            concatCodigo('print("%c",10);');
        }
    }

}
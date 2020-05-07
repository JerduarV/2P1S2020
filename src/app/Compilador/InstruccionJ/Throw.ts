import { InstruccionJ } from './InstruccionJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo, ARITHMETICEX, INDEXOUTOFBOUNDEX, UNCAUGTHEX, INVALIDCASTINGEXCEPTION, HEAPOVERFLOWERROR, STACKOVERFLOWERROR, NULLPOINTEREX } from '../TSJ/Tipo';
import { concatCodigo, concatException } from 'src/app/Auxiliares/Utilidades';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';

export class Throw extends InstruccionJ{

    private readonly exp_exception: ExpresionJ;

    constructor(exp: ExpresionJ, fila: number, col: number){
        super(null,fila,col);
        this.exp_exception = exp;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        let o: Object = this.exp_exception.getTipo(ts);
        if(o instanceof ErrorLup){
            return;
        }
        let tipo: Tipo = <Tipo>o;
        if(!tipo.esException()){
            ts.GenerarError('Se esperaba un struct exception',this.getFila(),this.getCol());
            return;
        }

        switch(tipo.getNombreTipo().toUpperCase()){
            case ARITHMETICEX:
                concatException(1,ts);
                break;
            case INDEXOUTOFBOUNDEX:
                concatException(2,ts);
                break;
            case UNCAUGTHEX:
                concatException(3,ts);
                break;
            case NULLPOINTEREX:
                concatException(4,ts);
                break;
            case INVALIDCASTINGEXCEPTION:
                concatException(5,ts);
                break;
            case HEAPOVERFLOWERROR:
                concatException(6,ts);
                break;
            case STACKOVERFLOWERROR:
                concatException(7,ts);
        }
    }

}
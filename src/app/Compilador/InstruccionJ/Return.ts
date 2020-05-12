import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { concatCodigo, getTempAct, getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo } from '../TSJ/Tipo';

export class Return extends InstruccionJ{

    private readonly exp: ExpresionJ;

    constructor(exp: ExpresionJ,fila: number, col: number){
        super(null,fila,col);
        this.exp = exp;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        if(this.exp == null){
            concatCodigo('goto ' + ts.etq_fun_salida + '; #* RETORNO *#');
        }else{
            let o: Object = this.exp.getTipo(ts);
            if(o instanceof ErrorLup){
                ts.GenerarError('Error en la expresión del retorno', this.getFila(),this.getCol());
                return;
            }
            let tipo: Tipo = <Tipo>o;

            if(!ts.funcion_actual.getTipoRet().esIgualA(tipo) && !ts.funcion_actual.getTipoRet().AplicaCasteo(tipo)){
                ts.GenerarError('El tipo del retorno no coincide con la función', this.getFila(),this.getCol());
                return;
            }

            this.exp.Traducir(ts);
            let temp: string = getTempAct();

            concatCodigo('Stack[P] = ' + temp + ';#* RETORNO *#');
            concatCodigo('goto ' + ts.etq_fun_salida + ';');

            ts.SacarTemporal(temp);
        }
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('RETURN');
        conectarNodo(padre, n);
        this.exp.dibujar(n);
    }

}
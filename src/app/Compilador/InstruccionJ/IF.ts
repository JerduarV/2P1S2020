import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { Else } from './Else';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo } from '../TSJ/Tipo';
import { getTempAct, getEtiqueta, concatCodigo } from 'src/app/Auxiliares/Utilidades';
import { NewTablaLocal } from '../TSJ/TablaSimbJ';

export class IF extends InstruccionJ {

    private readonly cond: ExpresionJ;

    private readonly sino: Else;

    public etiqueta_salida: string;

    constructor(cond: ExpresionJ, cuerpo: NodoASTJ[], sino: Else, fila: number, col: number) {
        super(cuerpo, fila, col);
        this.cond = cond;
        this.sino = sino;
        this.etiqueta_salida = null;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        let o: Object = this.cond.getTipo(ts);
        if (o instanceof ErrorLup) {
            ts.GenerarError('Hubo un error en la condición', this.getFila(), this.getCol());
            return;
        }

        let tipo: Tipo = <Tipo>o;
        if (!tipo.isBoolean()) {
            ts.GenerarError('Se esperaba una expresión booleana', this.getFila(), this.getCol());
            return;
        }

        let etqv: string = getEtiqueta();
        let etqf: string = getEtiqueta();
        this.cond.Traducir(ts);
        let temp_cond = getTempAct();

        concatCodigo('if(' + temp_cond + ' == 1) goto ' + etqv + ';');
        concatCodigo('goto ' + etqf + ';')
        concatCodigo(etqv + ':');
        this.TraducirCuerpo(NewTablaLocal(ts));

        let etq_salida: string = this.etiqueta_salida == null ? getEtiqueta() : this.etiqueta_salida;
        concatCodigo('goto ' + etq_salida + ';')
        concatCodigo(etqf + ':');

        if (this.sino != null) {
            this.sino.etiqueta_salida = etq_salida;
            this.sino.Traducir(ts);
        }

        if(this.etiqueta_salida == null){
            concatCodigo(etq_salida + ':'); 
        }
    }

}
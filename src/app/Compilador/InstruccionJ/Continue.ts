import { InstruccionJ } from './InstruccionJ';
import { concatCodigo } from 'src/app/Auxiliares/Utilidades';

export class Continue extends InstruccionJ {

    constructor(fila: number, col: number){
        super(null, fila, col);
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        if(!ts.esValidoContinue()){
            ts.GenerarError('Continue fuera de lugar', this.getFila(), this.getCol())
            return;
        }
        concatCodigo('goto ' + ts.getEtqInicio() + ';');
    }

}
import { InstruccionJ } from './InstruccionJ';
import { concatCodigo } from 'src/app/Auxiliares/Utilidades';

export class Break extends InstruccionJ{
    
    constructor(fila: number, col: number){
        super(null, fila,col);
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        if(!ts.esValidaBreak()){
            ts.GenerarError('Break fuera de lugar', this.getFila(), this.getCol());
        }
        concatCodigo('goto ' + ts.getEtqSalida() + ';');
    }

    public dibujar(padre: string): void {
        throw new Error("Method not implemented.");
    }
}
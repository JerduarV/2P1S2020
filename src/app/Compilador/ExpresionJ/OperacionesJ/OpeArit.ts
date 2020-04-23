import { OperacionJ, TipoOpeJ } from './OperacionJ';
import { ExpresionJ } from '../ExpresionJ';
import { TablaSimbJ } from '../../TSJ/TablaSimbJ';

export class OpeArit extends OperacionJ{

    constructor(t: TipoOpeJ, izq: ExpresionJ, der: ExpresionJ, fila: number, col: number){
        super(t,izq,der,fila,col);
    }

    public Analizar(ts: TablaSimbJ): Object {
        throw new Error("Method not implemented.");
    }
    public Traducir(): void {
        throw new Error("Method not implemented.");
    }

}
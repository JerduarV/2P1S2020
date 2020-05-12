import { ExpresionJ } from './ExpresionJ';
import { getTipoNull } from '../TSJ/Tipo';
import { genTemp, concatCodigo, conectarNodo, getIdNodo } from 'src/app/Auxiliares/Utilidades';

export class Null extends ExpresionJ {

    constructor(fila: number, col: number) {
        super(fila, col)
    }

    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        return getTipoNull();
    }
    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        let tr: string = genTemp();
        concatCodigo(tr + ' = -1;');
        ts.guardarTemporal(tr);
    }

    public dibujar(padre: string): void {
        conectarNodo(padre, getIdNodo('NULL'));
    }

}
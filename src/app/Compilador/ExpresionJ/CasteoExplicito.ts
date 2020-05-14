import { ExpresionJ } from './ExpresionJ';
import { Tipo } from '../TSJ/Tipo';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { getTempAct, genTemp, concatCodigo, getEtiqueta, getIdNodo, conectarNodo, concatException } from 'src/app/Auxiliares/Utilidades';

export class CasteoExplicito extends ExpresionJ {

    private readonly tipo: Tipo;
    private readonly exp: ExpresionJ;

    constructor(tipo: Tipo, exp: ExpresionJ, fila: number, col: number) {
        super(fila, col);
        this.tipo = tipo;
        this.exp = exp;
    }

    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        if (!(this.tipo.isChar() || this.tipo.isInteger())) {
            return ts.GenerarError('No es un tipo valido de casteo: ' + this.tipo.getString(), this.getFila(), this.getCol());
        }
        let o: Object = this.exp.getTipo(ts);
        if (o instanceof ErrorLup) {
            return o;
        }
        let t: Tipo = <Tipo>o;
        if (this.tipo.isInteger() && t.isDouble()
            || this.tipo.isChar() && (t.isInteger() || t.isDouble())) {
            return this.tipo;
        }

        return ts.GenerarError('Comibinación erronea ' + this.tipo.getString() + ' con ' + t.getString(), this.getFila(), this.getCol());
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {

        let tipo: Tipo = <Tipo>this.exp.getTipo(ts);
        this.exp.Traducir(ts);
        let tr: string = getTempAct();

        if (this.tipo.isInteger() && tipo.isDouble()) {
            //#region (INT)DOUBLE
            let t1: string = genTemp();
            let t2: string = genTemp();
            concatCodigo(t1 + ' = ' + tr + ' % 1.0;');
            concatCodigo(t2 + ' = ' + tr + ' - ' + t1 + ';');
            ts.SacarTemporal(tr);
            ts.guardarTemporal(t2);
            return;
            //#endregion
        } else if (this.tipo.isChar() && tipo.isInteger()) {
            //#region (CHAR)INT
            let etqv1: string = getEtiqueta();
            let etqf1: string = getEtiqueta();
            let etqv2: string = getEtiqueta();
            let etqf2: string = getEtiqueta();
            concatCodigo('if(' + tr + ' < 0) goto ' + etqv1 + ';');
            concatCodigo('goto ' + etqf1 + ';');
            concatCodigo(etqv1 + ':');
            concatException(5, ts);
            //concatCodigo('E = 5;');
            concatCodigo(etqf1 + ':');
            concatCodigo('if(' + tr + ' > 255) goto ' + etqv2 + ';');
            concatCodigo('goto ' + etqf2 + ';');
            concatCodigo(etqv2 + ':');
            concatException(5, ts);
            //concatCodigo('E = 5;');
            concatCodigo(etqf2 + ':');
            //#endregion
        } else if (this.tipo.isChar() && tipo.isDouble()) {
            //#region (CHAR)DOBULE
            let t1: string = genTemp();
            let t2: string = genTemp();
            concatCodigo(t1 + ' = ' + tr + ' % 1.0;');
            concatCodigo(t2 + ' = ' + tr + ' - ' + t1 + ';');
            let etqv1: string = getEtiqueta();
            let etqf1: string = getEtiqueta();
            let etqv2: string = getEtiqueta();
            let etqf2: string = getEtiqueta();
            concatCodigo('if(' + t2 + ' < 0) goto ' + etqv1 + ';');
            concatCodigo('goto ' + etqf1 + ';');
            concatCodigo(etqv1 + ':');
            concatException(5, ts);
            //concatCodigo('E = 5;');
            concatCodigo(etqf1 + ':');
            concatCodigo('if(' + t2 + ' > 255) goto ' + etqv2 + ';');
            concatCodigo('goto ' + etqf2 + ';');
            concatCodigo(etqv2 + ':');
            concatException(5, ts);
            //concatCodigo('E = 5;');
            concatCodigo(etqf2 + ':');
            ts.SacarTemporal(tr);
            ts.guardarTemporal(t2);
            //#endregion
        }
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('CASTEO_EXPL');
        conectarNodo(padre, n);
        conectarNodo(n, getIdNodo(this.tipo.getString()));
        this.exp.dibujar(n);
    }

}
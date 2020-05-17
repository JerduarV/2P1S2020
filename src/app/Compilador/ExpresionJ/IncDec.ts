import { ExpresionJ } from './ExpresionJ';
import { Acceso } from './Acceso';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo } from '../TSJ/Tipo';
import { getTempAct, genTemp, concatCodigo, getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';
import { OpeArit } from './OperacionesJ/OpeArit';
import { TipoOpe } from 'src/app/Interprete3D/Expresion/Operacion';
import { LiteralJ, TipoLit } from './LiteralJ';
import { TipoOpeJ } from './OperacionesJ/OperacionJ';

export class IncDec extends ExpresionJ {

    private readonly Acceso: Acceso;

    private readonly val: number;

    constructor(Acceso: Acceso, val: number, fila: number, col: number) {
        super(fila, col);
        this.Acceso = Acceso;
        this.val = val;
    }

    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        let o: Object = this.Acceso.getTipo(ts);
        if (o instanceof ErrorLup) {
            return o;
        }

        let tipo: Tipo = <Tipo>o;
        if (tipo.isNumerico() || tipo.isChar()) {
            return tipo;
        }

        return ts.GenerarError('Se esperaba un acceso numérico o char', this.getFila(), this.getCol());

    }
    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {

        let o: Object = this.getTipo(ts);

        if (o instanceof ErrorLup) {
            return;
        }

        this.Acceso.Traducir(ts);
        let t1: string = getTempAct();

        let lit: LiteralJ = new LiteralJ(this.val, TipoLit.LIT_INT, this.getFila(), this.getCol());
        let acc: Acceso = new Acceso(this.Acceso.lista_exp, this.getFila(), this.getCol());
        acc.exp = new OpeArit(TipoOpeJ.SUMA, this.Acceso, lit, this.getFila(), this.getCol());
        acc.Traducir(ts);

        let tr: string = genTemp();
        concatCodigo(tr + ' = ' + t1 + ';');
        ts.SacarTemporal(t1);
        ts.guardarTemporal(tr);

    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('INC_DEC');
        conectarNodo(padre, n);
        conectarNodo(n, getIdNodo(this.val == -1 ? '--' : '++'));
        this.Acceso.dibujar(n);
    }

}
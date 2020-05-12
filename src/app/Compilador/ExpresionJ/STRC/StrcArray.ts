import { ExpresionJ } from '../ExpresionJ';
import { Tipo } from '../../TSJ/Tipo';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { getTempAct, genTemp, concatCodigo, getEtiqueta, getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';

export class StrcArray extends ExpresionJ {

    private readonly tipo: Tipo;

    private readonly exp: ExpresionJ;

    constructor(tipo: Tipo, exp: ExpresionJ, fila: number, col: number) {
        super(fila, col);
        this.tipo = tipo;
        this.exp = exp;
    }

    public getTipo(ts: import("../../TSJ/TablaSimbJ").TablaSimbJ): Object {
        if (!ts.getExisteTipo(this.tipo)) {
            return ts.GenerarError('No existe el tipo: ' + this.tipo.getString(), this.getFila(), this.getCol());
        }
        let o: Object = this.exp.getTipo(ts);
        if (o instanceof ErrorLup) {
            return o;
        }
        let tipo: Tipo = <Tipo>o;
        if (!(tipo.isInteger() || tipo.isChar())) {
            return ts.GenerarError('La expresión debe ser númerica', this.getFila(), this.getCol());
        }
        return this.tipo;
    }


    public Traducir(ts: import("../../TSJ/TablaSimbJ").TablaSimbJ): void {

        if (this.getTipo(ts) instanceof ErrorLup) {
            return;
        }

        let etq1: string = getEtiqueta();
        let etqf: string = getEtiqueta();

        this.exp.Traducir(ts);
        let t0: string = getTempAct();

        let t1: string = genTemp();
        let t2: string = genTemp();
        let t3: string = genTemp();
        let tr: string = genTemp();

        concatCodigo('if(' + t0 + ' < 0) goto ' + etq1 + ';');
        concatCodigo('goto ' + etqf + ';');
        concatCodigo(etq1 + ':')
        concatCodigo('E = 2;');
        concatCodigo(etqf + ':');

        
        let t: Tipo = <Tipo>this.getTipo(ts);
        let y: Tipo = new Tipo(t.getNombreTipo(),0);
        console.log(y.getValDefecto());
        console.log(y);

        concatCodigo(t1 + ' = ' + y.getValDefecto() + ';');
        concatCodigo('P = P + ' + ts.getTamanioFunTotal() + ';');
        concatCodigo(t2 + ' = P + 1;');
        concatCodigo('Stack[' + t2 + '] = ' + t0 + ';');
        concatCodigo(t3 + ' = P + 2;');
        concatCodigo('Stack[' + t3 + '] = ' + t1 + ';');
        concatCodigo('call jerduar_CONSARRAY1;');
        concatCodigo(tr + ' = Stack[P];');
        concatCodigo('P = P - ' + ts.getTamanioFunTotal() + ';');

        ts.SacarTemporal(t0);
        ts.guardarTemporal(tr);
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('STRC_ARRAY');
        conectarNodo(padre, n);
        conectarNodo(n, getIdNodo(this.tipo.getString()));
        this.exp.dibujar(n);
    }

}
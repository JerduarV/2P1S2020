import { ExpresionJ } from './ExpresionJ';
import { CallFun } from './CallFun';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo, getTipoInteger } from '../TSJ/Tipo';
import { getTempAct, genTemp, getEtiqueta, concatCodigo } from 'src/app/Auxiliares/Utilidades';

export class CallFunArray extends ExpresionJ {

    private readonly callFun: CallFun;
    private readonly exp_index: ExpresionJ;

    constructor(call: CallFun, index: ExpresionJ, fila: number, col: number) {
        super(fila, col);
        this.callFun = call;
        this.exp_index = index;
    }

    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        let o: Object = this.callFun.getTipo(ts);
        if (o instanceof ErrorLup) {
            return o;
        }
        let tipo: Tipo = <Tipo>o;

        if (!tipo.soyArreglo()) {
            return ts.GenerarError('Se esperaba un arreglo', this.getFila(), this.getCol());
        }

        let ob: Object = this.exp_index.getTipo(ts);
        if (ob instanceof ErrorLup) {
            return ob;
        }

        let tipo_index: Tipo = <Tipo>ob;

        if (!tipo_index.isInteger() && !getTipoInteger().AplicaCasteo(tipo_index)) {
            return ts.GenerarError('Se esperaba un integer en el indice', this.getFila(), this.getCol());
        }

        return new Tipo(tipo.getNombreTipo(), 0);
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {

        let etqv: string = getEtiqueta();
        let etqf: string = getEtiqueta();
        let etqv1: string = getEtiqueta();
        let etqf1: string = getEtiqueta();

        this.callFun.Traducir(ts)
        let tarray: string = getTempAct();

        let t1: string = genTemp();//tamanio
        let t2: string = genTemp();//indice real

        concatCodigo('if(' + tarray + ' == -1) goto ' + etqv + ';')
        concatCodigo('goto ' + etqf + ';');
        concatCodigo(etqv + ':');
        concatCodigo('E = 4;');
        concatCodigo(etqf + ':');

        concatCodigo(t1 + ' = Heap[' + tarray + '];');

        this.exp_index.Traducir(ts);
        let tindex = getTempAct();

        concatCodigo('if(' + tindex + ' < 0) goto ' + etqv1 + ';')
        concatCodigo('if(' + tindex + ' >= ' + t1 + ') goto ' + etqv1 + ';');
        concatCodigo('goto ' + etqf1 + ';')
        concatCodigo(etqv1 + ':');
        concatCodigo('E = 2;');
        concatCodigo(etqf1 + ':');

        concatCodigo(t2 + ' = ' + tarray + ' + ' + tindex + ';');
        concatCodigo(t2 + ' = ' + t2 + ' +  1;');

        let tr: string = genTemp();//resultado

        concatCodigo(tr + ' = Heap[' + t2 + '];');
        console.log(tr);

        ts.guardarTemporal(tr);
        ts.SacarTemporal(tindex);
        ts.SacarTemporal(tarray);

    }

    public getCall(): CallFun {
        return this.callFun;
    }

    public getIndex(): ExpresionJ {
        return this.exp_index;
    }

    public dibujar(padre: string): void {
        throw new Error("Method not implemented.");
    }

}
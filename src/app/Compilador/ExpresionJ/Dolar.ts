import { ExpresionJ } from './ExpresionJ';
import { Acceso } from './Acceso';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { Tipo } from '../TSJ/Tipo';
import { getTempAct, getEtiqueta, concatCodigo, genTemp } from 'src/app/Auxiliares/Utilidades';
import { DefStruct } from '../InstruccionJ/DefStruct';

export class Dolar extends ExpresionJ {

    private readonly exp: Acceso;

    constructor(exp: Acceso, fila: number, col: number) {
        super(fila, col);
        this.exp = exp;
    }

    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        let o: Object = this.exp.getTipo(ts);
        if (o instanceof ErrorLup) {
            return o;
        }
        return <Tipo>o;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        let o: Object = this.exp.getTipo(ts);
        if (o instanceof ErrorLup) {
            return;
        }

        let tipo: Tipo = <Tipo>o;

        this.exp.Traducir(ts);
        let t_exp: string = getTempAct();

        if (tipo.isString() || tipo.soyArreglo()) {

            let etqv: string = getEtiqueta();
            let etqsal: string = getEtiqueta();
            let t1: string = genTemp();
            let tr: string = genTemp();

            concatCodigo('if(' + t_exp + ' == -1) goto ' + etqv + ';');

            concatCodigo('P = P + ' + ts.getTamanioFunTotal() + ';');
            concatCodigo(t1 + ' = P + 1;');
            concatCodigo('Stack[' + t1 + '] = ' + t_exp + ';');
            concatCodigo('call jerduar_STRINGTOCHARARRAY;');
            concatCodigo(tr + ' = Stack[P];');
            concatCodigo('P = P - ' + ts.getTamanioFunTotal() + ';');
            concatCodigo('goto ' + etqsal + ';');

            concatCodigo(etqv + ':');
            concatCodigo(tr + ' = ' + t_exp + ';');

            concatCodigo(etqsal + ':');

            ts.SacarTemporal(t_exp);
            ts.guardarTemporal(tr);

        } else if (tipo.esStruct()) {

            let strc: DefStruct = ts.BuscarStruct(tipo.getNombreTipo());

            let etqv: string = getEtiqueta();
            let etqsal: string = getEtiqueta();
            let etqini: string = getEtiqueta();
            let t1: string = genTemp();
            let t2: string = genTemp();
            let t3: string = genTemp();
            let tr: string = genTemp();

            concatCodigo('if(' + t_exp + ' == -1) goto ' + etqv + ';');

            concatCodigo(t1 + ' = 0;');
            concatCodigo(tr + ' = H;');
            
            concatCodigo(etqini + ':')
            concatCodigo('if(' + t1 + ' >= ' + strc.getSize() + ') goto ' + etqsal + ';');
            concatCodigo(t2 + ' = ' + t_exp + ' + ' + t1 + ';');
            concatCodigo(t3 + ' = Heap[' + t2 + '];');
            concatCodigo('Heap[H] = ' + t3 + ';');
            concatCodigo('H = H + 1;');
            concatCodigo(t1 + ' = ' + t1 + ' + 1;');
            concatCodigo('goto ' + etqini + ';');

            concatCodigo(etqv + ':');
            concatCodigo(tr + ' = ' + t_exp + ';');

            concatCodigo(etqsal + ':');

            ts.SacarTemporal(t_exp);
            ts.guardarTemporal(tr);
        }else{
            let tr: string = genTemp();
            concatCodigo(tr + ' = ' + t_exp + ';')
            ts.SacarTemporal(t_exp);
            ts.guardarTemporal(tr);
        }
    }

}
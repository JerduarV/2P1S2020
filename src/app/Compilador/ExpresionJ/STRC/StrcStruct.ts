import { ExpresionJ } from '../ExpresionJ';
import { Tipo } from '../../TSJ/Tipo';
import { concatCodigo, genTemp } from 'src/app/Auxiliares/Utilidades';

export class StrcStruct extends ExpresionJ {

    private readonly id: string;

    constructor(id: string, fila: number, col: number) {
        super(fila, col);
        this.id = id;
    }

    public getTipo(ts: import("../../TSJ/TablaSimbJ").TablaSimbJ): Object {
        let t: Tipo = new Tipo(this.id, 0);
        if (!ts.getExisteTipo(t)) {
            return ts.GenerarError('No existe el tipo ' + this.id, this.getFila(), this.getCol());
        }
        return t;
    }

    public Traducir(ts: import("../../TSJ/TablaSimbJ").TablaSimbJ): void {
        
        let t: Tipo = new Tipo(this.id, 0);
        if (!ts.getExisteTipo(t)) {
            return;
        }

        if(t.esException()){
            let tr: string = genTemp();
            concatCodigo('Heap[H] = 0;');
            concatCodigo('H = H + 1;');
            ts.guardarTemporal(tr);
            return;
        }

        //ESCRIBO SALIDA DE LA FUNCIÓN ACTUAL
        concatCodigo('P = P + ' + ts.getTamanioFunTotal() + ';');

        //GUARDADO DE TEMPORALES
        concatCodigo('#* GUARDANDO TEMPORALES *#')
        let cont: number = 0;
        ts.tabla_temporales.forEach(temp => {
            let t1: string = genTemp();
            concatCodigo(t1 + ' = P + ' + (cont++) + ';');
            concatCodigo('Stack[' + t1 + '] = ' + temp + ';');
        });
        concatCodigo('#* FIN GUARDADO TEMPORALES *#');

        //ESCRIBO SALIDA DEL ESPACIO DE TEMPORALES GUARDADOS
        concatCodigo('P = P + ' + ts.tabla_temporales.size + ';');

        concatCodigo('#* LLAMANDO FUNCION *#');
        concatCodigo('call ' + 'jerduarCons_' + this.id.toUpperCase() + ';');
        let tr: string = genTemp();
        concatCodigo(tr + ' = Stack[P];');

        //REGRESO AL AREA DE TEMPORALES GUARDADOS
        concatCodigo('P = P - ' + ts.tabla_temporales.size + ';');

        //RECUPERANDO TEMPORALES
        concatCodigo('#* RECUPERANDO TEMPORALES *#')
        cont = 0;
        ts.tabla_temporales.forEach(temp => {
            let t1: string = genTemp();
            concatCodigo(t1 + ' = P + ' + (cont++) + ';');
            concatCodigo(temp + ' = Stack[' + t1 + '];');
        });
        concatCodigo('#* FIN RECUPERACION DE TEMPORALES *#');

        //REGRESANDO A LA FUNCIÓN ACTUAL
        concatCodigo('P = P - ' + ts.getTamanioFunTotal() + ';');

        let trest: string = genTemp();
        concatCodigo(trest + ' = ' + tr + ';');
        ts.guardarTemporal(trest);
    }

}
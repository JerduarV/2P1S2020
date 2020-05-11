import { ExpresionJ } from './ExpresionJ';
import { Tipo } from '../TSJ/Tipo';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { DecFun } from '../InstruccionJ/DecFun';
import { getTempAct, concatCodigo, genTemp } from 'src/app/Auxiliares/Utilidades';
import { CallFun } from './CallFun';

export class ParamT2 {
    nombre: string;
    exp: ExpresionJ;

    constructor(nombre: string, exp: ExpresionJ) {
        this.nombre = nombre;
        this.exp = exp;
    }
}

export class CallFun2 extends CallFun {


    private readonly lista_param: ParamT2[];

    constructor(id: string, lista: ParamT2[], fila: number, col: number) {
        super(id,null,fila, col);
        this.lista_param = lista;
    }

    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        let lista_tipos: Tipo[] = [];
        for (let i = 0; i < this.lista_param.length; i++) {
            let o: Object = this.lista_param[i].exp.getTipo(ts);
            if (o instanceof ErrorLup) {
                return o;
            }
            lista_tipos.push(<Tipo>o);
        }

        let funcion: DecFun = ts.BuscarFuncion2(this.id, this.lista_param, lista_tipos);
        if (funcion == null) {
            return ts.GenerarError('No se encuentra la función ' + this.id, this.getFila(), this.getCol());
        }
        //console.log(funcion);
        return funcion.getTipoRet();
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {

        //#region BUSQUEDA FUNCIÓN
        let lista_tipos: Tipo[] = [];
        for (let i = 0; i < this.lista_param.length; i++) {
            let o: Object = this.lista_param[i].exp.getTipo(ts);
            if (o instanceof ErrorLup) {
                return;
            }
            lista_tipos.push(<Tipo>o);
        }

        let funcion: DecFun = ts.BuscarFuncion2(this.id, this.lista_param, lista_tipos);
        if (funcion == null) {
            return;
        }
        //#endregion

        //RESOLUCIÓN DE PARAMETROS ACTUALES
        let lista_temp_param: string[] = [];
        this.lista_param.forEach(param => {
            param.exp.Traducir(ts);
            let p: string = getTempAct();
            lista_temp_param.push(p);
            //ts.guardarTemporal(p);
        });

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

        //PASO DE PARAMETROS
        concatCodigo('#* PASANDO PARAMETROS *#');
        for (let i = 0; i < funcion.getParamatrosFormales().length; i++) {
            let t1: string = genTemp();
            concatCodigo(t1 + ' = P + ' + (i + 1) + ';');
            concatCodigo('Stack[' + t1 + '] = ' + lista_temp_param[this.BuscarTemporal(funcion.getParamatrosFormales()[i].nombre)] + ';');
        }
        concatCodigo('#* FIN PASO DE PARAMETROS *#');

        concatCodigo('#* LLAMANDO FUNCION *#');
        concatCodigo('call ' + funcion.getNombreLlamada() + ';');
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
        concatCodigo('#* FIN RECUPERACION DE TEMPORALES *#')
        let trest: string = genTemp();
        //REGRESANDO A LA FUNCIÓN ACTUAL
        concatCodigo('P = P - ' + ts.getTamanioFunTotal() + ';');

        concatCodigo(trest + ' = ' + tr + ';');
        ts.guardarTemporal(trest);
        lista_temp_param.forEach(temp => {
            ts.SacarTemporal(temp);
        });
    }



    private BuscarTemporal(nombre_param: string): number {
        for (let i = 0; i < this.lista_param.length; i++) {
            if (this.lista_param[i].nombre.toUpperCase() == nombre_param.toUpperCase()) {
                return i;
            }
        }
        console.log('No encontre el parametro');
        return 0;
    }

    public dibujar(padre: string): void {
        throw new Error("Method not implemented.");
    }

}
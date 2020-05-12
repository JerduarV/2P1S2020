import { ExpresionJ } from './ExpresionJ';
import { Tipo } from '../TSJ/Tipo';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { DecFun } from '../InstruccionJ/DecFun';
import { getTempAct, concatCodigo, genTemp, getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';
import { concat } from 'rxjs';

export class CallFun extends ExpresionJ {

    protected readonly id: string
    private readonly paramAct: ExpresionJ[];


    constructor(id: string, param: ExpresionJ[], fila: number, col: number) {
        super(fila, col);
        this.id = id;
        this.paramAct = param;
    }

    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        let lista_tipos: Tipo[] = [];
        for (let i = 0; i < this.paramAct.length; i++) {
            let o: Object = this.paramAct[i].getTipo(ts);
            if (o instanceof ErrorLup) {
                return o;
            }
            lista_tipos.push(<Tipo>o);
        }

        let funcion: DecFun = ts.BuscarFuncion(this.id, lista_tipos);
        if (funcion == null) {
            return ts.GenerarError('No se encuentra la función ' + this.id, this.getFila(), this.getCol());
        }
        return funcion.getTipoRet();
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        //#region BUSCQUEDA FUNCIÓN
        let lista_tipos: Tipo[] = [];
        for (let i = 0; i < this.paramAct.length; i++) {
            let o: Object = this.paramAct[i].getTipo(ts);
            if (o instanceof ErrorLup) {
                //console.log('error');
                return;
            }
            lista_tipos.push(<Tipo>o);
        }

        let funcion: DecFun = ts.BuscarFuncion(this.id, lista_tipos);
        if (funcion == null) {
            return;
        }
        //#endregion

        //console.log(this.paramAct);

        //RESOLUCIÓN DE PARAMETROS ACTUALES
        let lista_temp_param: string[] = [];
        this.paramAct.forEach(param => {
            param.Traducir(ts);
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
        concatCodigo('#* FIN GUARDADO TEMPORALES *#')

        //ESCRIBO SALIDA DEL ESPACIO DE TEMPORALES GUARDADOS
        concatCodigo('P = P + ' + ts.tabla_temporales.size + ';');

        //PASO DE PARAMETROS
        concatCodigo('#* PASANDO PARAMETROS *#');
        for (let i = 0; i < lista_temp_param.length; i++) {
            let t1: string = genTemp();
            concatCodigo(t1 + ' = P + ' + (i + 1) + ';');
            concatCodigo('Stack[' + t1 + '] = ' + lista_temp_param[i] + ';');
        }
        concatCodigo('#* FIN PASO DE PARAMETROS *#')

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

    public getId(): string {
        return this.id;
    }

    public getParam(): ExpresionJ[] {
        return this.paramAct;
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('CALL_FUN');
        conectarNodo(padre, n);
        conectarNodo(n, getIdNodo(this.id));
        if (this.paramAct.length > 0) {
            let l_param_act: string = getIdNodo('L_PARAM_ACT');
            conectarNodo(n, l_param_act);
            this.paramAct.forEach(param => {
                param.dibujar(l_param_act);
            });
        }
    }


}
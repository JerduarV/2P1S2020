import * as parser from 'src/Gramatica/GramaticaJSharp';
import { Consola } from '../Auxiliares/Consola';
import { TablaSimbJ, NewTablaLocal } from './TSJ/TablaSimbJ';
import { DeclaracionJ } from './InstruccionJ/DeclaracionJ';
import { NodoASTJ } from './ASTJ/NodoASTJ';
import { Tipo } from './TSJ/Tipo';
import { SimbVar } from './TSJ/SimbVar';
import { ExpresionJ } from './ExpresionJ/ExpresionJ';
import { inicializarTodo, concatCodigo, getTempAct, ImprimitCodigo, QuemarFunciones, GenerarEncabezado, getEtiqueta, genTemp } from '../Auxiliares/Utilidades';
import { DecFun } from './InstruccionJ/DecFun';
import { InstruccionJ } from './InstruccionJ/InstruccionJ';
import { DefStruct } from './InstruccionJ/DefStruct';
import { ErrorLup } from '../Auxiliares/Error';

export class CompiladorJ {
    constructor() {

    }

    /**
     * Analiza la entrada de código J#
     * @param entradaJSharp Archivo de entrada
     */
    public Compilar(archivo: string, entrada3d: string, cons: Consola) {

        inicializarTodo();

        try {

            let AST;
            //PARSEO
            AST = parser.parse(entrada3d);

            //console.log(AST);
            let global: TablaSimbJ = new TablaSimbJ(archivo, cons);

            //RECOLECCIÓN DE STRUCT
            let strc: DefStruct[] = this.RecolectarStructs(AST);
            this.GuardarStructs(strc, global);

            //RECOLECTAR FUCIONES
            let d: DecFun[] = this.RecolectarFunciones(global, AST);
            this.CalcularTamanioFunciones(d);

            //RECOLECCION DE GLOBALES
            this.RecolectarGlobales(global, AST);

            global.temp_true = this.EscrbirPalabras('true');
            global.temp_false = this.EscrbirPalabras('false');
            global.temp_null = this.EscrbirPalabras('null');
            //console.log(global.temp_false)
            //console.log(global.temp_true);


            //ETAPA DE TRADUCCIÓN

            let etiqueta_salida: string = getEtiqueta();
            concatCodigo('#* IR AL FIN DEL PROGRAMA *#\ncall main;\ngoto ' + etiqueta_salida + ';');

            //TRADUCCIÓN DE FUNCIONES
            this.TraducirFunciones(global, d);

            //TRADUCCIÓN STRUCT
            this.TraducirStructs(strc, global);

            //QUEMAR FUNCIONES NATIVAS
            QuemarFunciones(global);

            //GENERAR ENCABEZADO
            GenerarEncabezado();

            concatCodigo('#* FIN DEL PROGRAMA *#\n' + etiqueta_salida + ':');

            //IMPRESIÓN DEL CÓDIGO
            cons.salida = ImprimitCodigo();
            //console.log(global.getConsola().lista_errores);

        } catch (error) {
            console.log(error);
        }
    }

    private TraducirStructs(lista: DefStruct[], ts: TablaSimbJ): void {
        lista.forEach(strc => {
            strc.Traducir(NewTablaLocal(ts));
        });
    }

    /**
     * Método que guarda los structs en la tabla de símbolos
     * @param lista Lista de structs encontrados el archivo de entrada
     * @param ts Tabla de símbolos global
     */
    private GuardarStructs(lista: DefStruct[], ts: TablaSimbJ): void {
        lista.forEach(strc => {
            ts.GuardarStruct(strc);
        });
    }

    private CalcularTamanioFunciones(funciones: DecFun[]) {
        funciones.forEach(element => {
            element.DeterminarTamanioFuncion(element);
        });
    }

    public TraducirFunciones(global: TablaSimbJ, funciones: DecFun[]): void {
        for (let i = 0; i < funciones.length; i++) {
            funciones[i].Traducir(global);
        }
    }

    /**
     * Función que recolecta todas las funciones del arbol
     * @param ts Tabla de símbolos
     * @param AST Arbol
     */
    public RecolectarFunciones(ts: TablaSimbJ, AST: NodoASTJ[]): DecFun[] {
        let d: DecFun[] = [];
        for (let i: number = 0; i < AST.length; i++) {
            if (AST[i] instanceof DecFun) {
                let fun: DecFun = <DecFun>AST[i];
                fun.preAnalisis(ts);
                d.push(fun);
            }
        }
        return d;
    }

    private RecolectarStructs(AST: NodoASTJ[]): DefStruct[] {
        let lista_strc: DefStruct[] = [];
        AST.forEach(nodo => {
            if (nodo instanceof DefStruct) {
                lista_strc.push(nodo);
            } else {
                (<InstruccionJ>nodo).RecolectarStruct(lista_strc);
            }
        });
        return lista_strc;
    }

    /**
     * Función para recolectar todas las variables globales
     */
    public RecolectarGlobales(ts: TablaSimbJ, AST: NodoASTJ[]): void {
        let lista_dec_global: DeclaracionJ[] = [];
        let VariableGlobales: SimbVar[] = [];
        let expresiones_ini: ExpresionJ[] = [];
        let contador: number = 0;

        //BUSCO TODAS LAS DECLARACIONES GLOBALES
        for (let i = 0; i < AST.length; i++) {
            if (AST[i] instanceof DeclaracionJ) {
                lista_dec_global.push(<DeclaracionJ>AST[i]);
            } else {
                (<InstruccionJ>AST[i]).BuscarVariablesGlobales(lista_dec_global);
            }
        }

        for (let i = 0; i < lista_dec_global.length; i++) {
            let dec: DeclaracionJ = <DeclaracionJ>lista_dec_global[i];
            let t: Tipo = dec.getTipo();
            if (dec.esVar() || dec.esConstante() || dec.esGlobal()) {
                let tipo: Object = dec.getExp().getTipo(ts);
                if (tipo instanceof Tipo) {
                    t = <Tipo>tipo;
                }
            }
            for (let k = 0; k < dec.getListaIDs().length; k++) {
                //console.log(dec.getListaIDs()[k]);
                let s: SimbVar = ts.GuardarVarible(dec.getListaIDs()[k], t, true, dec.esConstante(), contador, dec.getFila(), dec.getCol());
                if (s != null) {
                    VariableGlobales.push(s);
                    expresiones_ini.push(dec.getExp());
                    contador += 2;

                    concatCodigo('Heap[' + s.getPosicion() + '] = ' + s.getTipo().getValDefecto() + ';');
                    let bandera: number = dec.dec_interna ? -1 : 1;
                    concatCodigo('Heap[' + (s.getPosicion() + 1) + '] = ' + bandera + ';');
                }
            }

        }

        //RESERVANDO LUGAR EN EL HEAP Y SETEANDO VALOR POR DEFECTO
        /*for (let y = 0; y < VariableGlobales.length; y++) {
            let variable: SimbVar = VariableGlobales[y];
            concatCodigo('Heap[' + variable.getPosicion() + '] = ' + variable.getTipo().getValDefecto() + ';');
        }*/

        concatCodigo('H = ' + contador + ';')

        //SETENDO VALOR SI APLICA
        /*for (let u = 0; u < VariableGlobales.length; u++) {
            if (expresiones_ini[u] != null) {
                expresiones_ini[u].Traducir(ts);
                let temp: string = getTempAct();
                concatCodigo('Heap[' + VariableGlobales[u].getPosicion() + '] = ' + temp + ';')
            }
        }*/
        for (let i = 0; i < lista_dec_global.length; i++) {
            let dec: DeclaracionJ = lista_dec_global[i];
            console.log(dec);
            if (dec.getExp() == null) {
                continue;
            }
            let o: Object = dec.getExp().getTipo(ts);
            if (o instanceof ErrorLup) {
                ts.GenerarError('Hubo un error en la expresión ', dec.getFila(), dec.getCol());
                continue;
            }

            let tipo = <Tipo>o;
            dec.getExp().Traducir(ts);
            let t1 = getTempAct();
            //console.log('holita');
            for (let y = 0; y < dec.getListaIDs().length; y++) {
                //console.log('hola');
                let variable: SimbVar = ts.BuscarVariable(dec.lista_ids[y]);
                if (variable == null) {
                    ts.GenerarError('La varible ' + dec.lista_ids[y] + ' no existe', dec.getFila(), dec.getCol());
                    continue;
                }
                if (!variable.getTipo().esIgualA(tipo) && !variable.getTipo().AplicaCasteo(tipo)) {
                    ts.GenerarError('Los tipos no coinciden ' + variable.getTipo().getString() + ' : ' + tipo.getString(), dec.getFila(), dec.getCol());
                    continue;
                }
                concatCodigo('Heap[' + variable.getPosicion() + '] = ' + t1 + ';');
            }
            ts.SacarTemporal(t1);
        }


        //console.log(VariableGlobales);
    }

    private EscrbirPalabras(val: string): string {
        let temp: string = genTemp();
        concatCodigo('\n#* GUARDANDO LA PALABRA ' + val.toUpperCase() + '*#\n')
        concatCodigo(temp + ' = H;');
        concatCodigo('Heap[H] = ' + val.length + ';');
        concatCodigo('H = H + 1;');
        for (let i = 0; i < val.length; i++) {
            concatCodigo('Heap[H] = ' + val.charCodeAt(i) + ';');
            concatCodigo('H = H + 1;');
        }
        return temp;
    }
}
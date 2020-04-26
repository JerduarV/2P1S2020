import * as parser from 'src/Gramatica/GramaticaJSharp';
import { Consola } from '../Auxiliares/Consola';
import { TablaSimbJ } from './TSJ/TablaSimbJ';
import { DeclaracionJ } from './InstruccionJ/DeclaracionJ';
import { NodoASTJ } from './ASTJ/NodoASTJ';
import { Tipo } from './TSJ/Tipo';
import { SimbVar } from './TSJ/SimbVar';
import { ExpresionJ } from './ExpresionJ/ExpresionJ';
import { inicializarTodo, concatCodigo, getTempAct, ImprimitCodigo, QuemarFunciones, GenerarEncabezado, getEtiqueta } from '../Auxiliares/Utilidades';
import { DecFun } from './InstruccionJ/DecFun';
import { InstruccionJ } from './InstruccionJ/InstruccionJ';

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

            console.log(AST);
            let global: TablaSimbJ = new TablaSimbJ(archivo, cons);

            //RECOLECTAR FUCIONES
            let d: DecFun[] = this.RecolectarFunciones(global, AST);

            //RECOLECCION DE GLOBALES
            this.RecolectarGlobales(global, AST);

            //ETAPA DE TRADUCCIÓN

            let etiqueta_salida: string = getEtiqueta();
            concatCodigo('#* IR AL FIN DEL PROGRAMA *#\ngoto ' + etiqueta_salida + ';');

            //TRADUCCIÓN DE FUNCIONES
            this.TraducirFunciones(global, d);

            //QUEMAR FUNCOINES NATIVAS
            QuemarFunciones();

            //GENERAR ENCABEZADO
            GenerarEncabezado();

            concatCodigo('#* FIN DEL PROGRAMA *#\n' + etiqueta_salida + ':');

            //IMPRESIÓN DEL CÓDIGO
            cons.salida = ImprimitCodigo();
            console.log(global.getConsola().lista_errores);

        } catch (error) {
            console.log(error);
        }
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

    /**
     * Función para recolectar todas las variables globales
     */
    public RecolectarGlobales(ts: TablaSimbJ, AST: NodoASTJ[]): void {
        let lista_dec_global: DeclaracionJ[] = [];
        let VariableGlobales: SimbVar[] = [];
        let expresiones_ini: ExpresionJ[] = [];
        let contador: number = 0;

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
                } else {

                }
                contador++;
            }

        }

        //RESERVANDO LUGAR EN EL HEAP Y SETEANDO VALOR POR DEFECTO
        for (let y = 0; y < VariableGlobales.length; y++) {
            let variable: SimbVar = VariableGlobales[y];
            concatCodigo('Heap[' + variable.getPosicion() + '] = ' + variable.getTipo().getValDefecto() + ';');
        }

        concatCodigo('H = ' + contador + ';')

        //SETENDO VALOR SI APLICA
        for (let u = 0; u < VariableGlobales.length; u++) {
            if (expresiones_ini[u] != null) {
                expresiones_ini[u].Traducir(ts);
                let temp: string = getTempAct();
                concatCodigo('Heap[' + VariableGlobales[u].getPosicion() + '] = ' + temp + ';')
            }
        }
        //console.log(VariableGlobales);
    }
}
import * as parser from 'src/Gramatica/GramaticaJSharp';
import { Consola } from '../Auxiliares/Consola';
import { TablaSimbJ, NewTablaLocal, lista_var_global } from './TSJ/TablaSimbJ';
import { DeclaracionJ } from './InstruccionJ/DeclaracionJ';
import { NodoASTJ } from './ASTJ/NodoASTJ';
import { Tipo, getTipoVacio, getTipoString, CHAR, getTipoInteger } from './TSJ/Tipo';
import { SimbVar } from './TSJ/SimbVar';
import { inicializarTodo, concatCodigo, getTempAct, ImprimitCodigo, QuemarFunciones, GenerarEncabezado, getEtiqueta, genTemp, getIdNodo, dot, DOT_GEN } from '../Auxiliares/Utilidades';
import { DecFun } from './InstruccionJ/DecFun';
import { InstruccionJ } from './InstruccionJ/InstruccionJ';
import { DefStruct } from './InstruccionJ/DefStruct';
import { ErrorLup } from '../Auxiliares/Error';
import { Import } from './InstruccionJ/Import';
import { Editor3Component } from '../components/editor3/editor3.component';
import { lista_funciones_global } from './TSJ/SimbFuncion';
import { ParametroFormal } from './TSJ/ParametroFormal';

export class CompiladorJ {
    constructor() {

    }

    /**
     * Analiza la entrada de código J#
     * @param entradaJSharp Archivo de entrada
     */
    public Compilar(archivo: string, entrada3d: string, cons: Consola, archivos: Editor3Component[]) {

        inicializarTodo();

        try {

            let AST;
            //PARSEO
            AST = parser.parse(entrada3d);

            this.DibujarAST(AST);

            //console.log(AST);
            let global: TablaSimbJ = new TablaSimbJ(archivo, cons);

            let lista_import: string[] = []
            //IMPORT
            this.BuscarImport(lista_import, AST);

            let list_arboles_import = [];
            for (let i = 0; i < lista_import.length; i++) {
                let Arbol: NodoASTJ[] = this.Import(lista_import[i], archivos);
                if (Arbol != null) {
                    list_arboles_import.push(Arbol);
                }
            }

            //console.log(list_arboles_import);

            //RECOLECCIÓN DE STRUCT
            let strc: DefStruct[] = this.RecolectarStructs(AST);
            list_arboles_import.forEach(element => {
                let list: DefStruct[] = this.RecolectarStructs(element);
                list.forEach(d => {
                    strc.push(d);
                });
            });
            this.GuardarStructs(strc, global);


            //RECOLECTAR FUCIONES
            let d: DecFun[] = this.RecolectarFunciones(global, AST);
            list_arboles_import.forEach(element => {
                let list: DecFun[] = this.RecolectarFunciones(global, element);
                list.forEach(element => {
                    d.push(element);
                });
            });
            this.CalcularTamanioFunciones(d);

            //RECOLECCION DE GLOBALES
            this.RecolectarGlobales(global, AST);

            //CREACIÓN DE CADENAS CONSTANTES
            global.temp_true = this.EscrbirPalabras('true');
            global.temp_false = this.EscrbirPalabras('false');
            global.temp_null = this.EscrbirPalabras('null');


            //ETAPA DE TRADUCCIÓN

            let etiqueta_salida: string = getEtiqueta();
            concatCodigo('#* IR AL FIN DEL PROGRAMA *#\ncall principal;\ngoto ' + etiqueta_salida + ';');

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

            //QUEMAR FUNCIONES NATIVAS DEL ENUNCIADO
            this.QuemarFunciones();

        } catch (error) {
            console.log(error);
        }
    }

    private QuemarFunciones(): void {
        let f1: DecFun = new DecFun(getTipoString(), 'toUpperCase', [], [], 0, 0);
        let f2: DecFun = new DecFun(getTipoString(), 'toLowerCase', [], [], 0, 0);
        let f3: DecFun = new DecFun(new Tipo(CHAR, 1), 'toCharArray', [], [], 0, 0);
        let f4: DecFun = new DecFun(getTipoInteger(), 'length', [], [], 0, 0);
        let f5: DecFun = new DecFun(getTipoInteger(), 'charAt', [new ParametroFormal(getTipoInteger(), 'n')], [], 0, 0);
        let f6: DecFun = new DecFun(getTipoInteger(), 'size', [], [], 0, 0);
        let f7: DecFun = new DecFun(getTipoInteger(), 'getReference', [], [], 0, 0);
        let f8: DecFun = new DecFun(getTipoInteger(), 'instanceOf', [], [], 0, 0);
        let f9: DecFun = new DecFun(getTipoInteger(), 'linealize', [], [], 0, 0);

        lista_funciones_global.push(f1);
        lista_funciones_global.push(f2);
        lista_funciones_global.push(f3);
        lista_funciones_global.push(f4);
        lista_funciones_global.push(f5);
        lista_funciones_global.push(f6);
        lista_funciones_global.push(f7);
        lista_funciones_global.push(f8);
        lista_funciones_global.push(f9);
    }

    private Import(Archivo: string, lista_files: Editor3Component[]): NodoASTJ[] {
        for (let i = 0; i < lista_files.length; i++) {
            if (Archivo == lista_files[i].getNombre()) {
                let AST;
                try {
                    AST = parser.parse(lista_files[i].code);
                    return AST;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        }
    }

    private BuscarImport(lista_files: string[], AST: NodoASTJ[]): void {
        for (let i = 0; i < AST.length; i++) {
            if (AST[i] instanceof Import) {
                let impor: Import = <Import>AST[i];
                impor.getListaFiles().forEach(id_file => {
                    lista_files.push(id_file);
                });
            }
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
        for (const nodo of AST) {
            if (nodo == null) {
                continue;
            }
            if (nodo instanceof DefStruct) {
                lista_strc.push(nodo);
            } else {
                (<InstruccionJ>nodo).RecolectarStruct(lista_strc);
            }
        }
        return lista_strc;
    }

    /**
     * Función para recolectar todas las variables globales
     */
    public RecolectarGlobales(ts: TablaSimbJ, AST: NodoASTJ[]): void {
        let lista_dec_global: DeclaracionJ[] = [];
        let contador: number = 0;

        //BUSCO TODAS LAS DECLARACIONES GLOBALES
        for (let i = 0; i < AST.length; i++) {
            if (AST[i] == null) {
                continue;
            }

            if (AST[i] instanceof DeclaracionJ) {
                lista_dec_global.push(<DeclaracionJ>AST[i]);
            } else {
                (<InstruccionJ>AST[i]).BuscarVariablesGlobales(lista_dec_global, ts);
            }
        }

        lista_var_global.splice(0, lista_var_global.length);

        for (let i = 0; i < lista_dec_global.length; i++) {
            let dec: DeclaracionJ = <DeclaracionJ>lista_dec_global[i];
            let t: Tipo = dec.getTipo();
            if (dec.esVar() || dec.esConstante() || dec.esGlobal()) {
                let tipo: Object = null;
                if (dec.tipo_exp_global != null) {
                    tipo = dec.tipo_exp_global;
                } else {
                    tipo = dec.getExp().getTipo(ts);
                }

                if (tipo instanceof Tipo) {
                    t = <Tipo>tipo;
                }/* else {
                    t = getTipoVacio();
                }*/
            }

            for (let k = 0; k < dec.getListaIDs().length; k++) {
                let s: SimbVar = ts.GuardarVarible(dec.getListaIDs()[k], t, true, dec.esConstante(), contador, dec.getFila(), dec.getCol(), false, "global");
                if (s != null) {
                    contador += 2;
                    concatCodigo('Heap[' + s.getPosicion() + '] = ' + s.getTipo().getValDefecto() + ';');
                    let bandera: number = dec.dec_interna ? -1 : 1;
                    concatCodigo('Heap[' + (s.getPosicion() + 1) + '] = ' + bandera + ';');
                }
            }

        }

        concatCodigo('H = ' + contador + ';')

        for (let i = 0; i < lista_dec_global.length; i++) {
            let dec: DeclaracionJ = lista_dec_global[i];
            if (dec.getExp() == null || dec.dec_interna) {
                continue;
            }

            let o: Object = dec.getExp().getTipo(ts);
            if (o instanceof ErrorLup) {
                continue;
            }

            let tipo = <Tipo>o;
            dec.getExp().Traducir(ts);
            let t1 = getTempAct();
            for (let y = 0; y < dec.getListaIDs().length; y++) {
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

    public DibujarAST(AST: NodoASTJ[]): void {
        let padre: string = getIdNodo('AST');
        AST.forEach(nodo => {
            if (nodo != null) {
                nodo.dibujar(padre);
            }
        });
        DOT_GEN();
    }
}
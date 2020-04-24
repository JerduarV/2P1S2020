import * as parser from 'src/Gramatica/GramaticaJSharp';
import { Consola } from '../Auxiliares/Consola';
import { TablaSimbJ } from './TSJ/TablaSimbJ';
import { DeclaracionJ } from './InstruccionJ/DeclaracionJ';
import { NodoASTJ } from './ASTJ/NodoASTJ';
import { Tipo } from './TSJ/Tipo';
import { SimbVar } from './TSJ/SimbVar';
import { ExpresionJ } from './ExpresionJ/ExpresionJ';

let contador_etq: number = 0;
let contador_tempo: number = 0;
let temAct = 0;
let codigo_gen: string = '';

export function genTemp(): string {
    temAct = contador_tempo;
    return 't' + contador_tempo++;
}

export function getTempAct():string{
    return 't' + temAct;
}

export function getEtiqueta():string{
    return 'L' + contador_etq++;
}

export function concatCodigo(cod: string):void{
    codigo_gen += cod + '\n';
}

export class CompiladorJ {
    constructor() {

    }

    /**
     * Analiza la entrada de código J#
     * @param entradaJSharp Archivo de entrada
     */
    public Compilar(archivo: string,entrada3d: string, cons: Consola) {
        contador_etq = 0;
        contador_tempo = 0;
        temAct = 0;
        codigo_gen = '';

        try {

            let AST;
            //PARSEO
            AST = parser.parse(entrada3d);

            console.log(AST);
            let global: TablaSimbJ = new TablaSimbJ(archivo, cons);
            //RECOLECCION DE GLOBALES
            this.RecolectarGlobales(global, AST);

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Función para recolectar todas las variables globales
     */
    public RecolectarGlobales(ts: TablaSimbJ, AST: NodoASTJ[]):string {
        let VariableGlobales: SimbVar[] = [];
        let expresiones_ini: ExpresionJ[] = [];
        let contador: number = 0;
        let cod:string = '';
        for(let i = 0; i < AST.length; i++){
            if(AST[i] instanceof DeclaracionJ){
                let dec:DeclaracionJ = <DeclaracionJ>AST[i];
                let t: Tipo = dec.getTipo();
                if(dec.getTipo().isVar() || dec.esConstante() || dec.esConstante()){
                    let tipo: Object = dec.getExp().Analizar(ts);
                    if(tipo instanceof Tipo){
                        t = <Tipo>tipo;
                    }
                }
                for(let k = 0; k < dec.getListaIDs().length; k++){
                    console.log(dec.getListaIDs()[k]);
                    let s: SimbVar = ts.GuardarVarible(dec.getListaIDs()[k],t,true,dec.esConstante(),contador,dec.getFila(),dec.getCol());
                    if(s != null){
                        VariableGlobales.push(s);
                        expresiones_ini.push(dec.getExp());
                    }
                    contador++;
                }
            }
        }

        //RESERVANDO LUGAR EN EL HEAP Y SETEANDO VALOR POR DEFECTO
        for(let y = 0; y < VariableGlobales.length; y++){
            let variable: SimbVar = VariableGlobales[y];
            concatCodigo('heap[' + variable.getPosicion() + '] = ' + variable.getTipo().getValDefecto() + ';');
        }

        //SETENDO VALOR SI APLICA
        for(let u = 0; u < VariableGlobales.length; u++){
            if(expresiones_ini[u] != null){
                expresiones_ini[u].Traducir(ts);
                let temp:string = getTempAct();
                concatCodigo('heap[' + VariableGlobales[u].getPosicion() + '] = ' + temp + ';')
            }
        }

        console.log(VariableGlobales);
        console.log(codigo_gen);
        return cod;
    }
}
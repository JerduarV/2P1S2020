import * as parser from 'src/Gramatica/Gramatica3D';
import { NodoAST } from './AST/NodoAST';
import { Direccion } from './Instruccion/Direccion';
import { TablaSimbolos } from './TS/TablaSimbolos';
import { Instruccion } from './Instruccion/Instruccion';
import { DecFuncion } from './Instruccion/DecFuncion';
import { Llamada } from './Llamada';

export class Interprete3D {

    constructor() {

    }

    /**
     * Analiza la entrada de código 3D
     * @param entrada3d Archivo de entrada
     */
    public Analizar(entrada3d: string) {
        try {

            let AST;
            //PARSEO
            AST = parser.parse(entrada3d);

            //LINEALIZACIÓN
            AST = this.Linealizar(AST);
            let ts: TablaSimbolos = new TablaSimbolos();

            //RECOLECCIÓN DE FUNCIONES
            this.RecolectarFuncion(ts, AST);

            //RECOLECCIÓN DE ETIQUETAS
            this.guardarEtiquetas(AST, ts);

            //EJECUCIÓN
            let pila: Llamada[] = [new Llamada(0, AST.length)];
            this.Recorrer(ts, AST, pila);
            console.log(AST);

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Recorre el árbol generado del 3D
     * @param ts Tabla de símbolos
     */
    private Recorrer(ts: TablaSimbolos, AST: [], pilaLlamadas: Llamada[]): void {
        while (pilaLlamadas.length > 0) {
            let llamdaAct: Llamada = pilaLlamadas[pilaLlamadas.length-1];
            for (let i = llamdaAct.inicio; i < llamdaAct.fin; i++) {
                let n: Instruccion = AST[i];

                //SI ES LA DECLARACIÓN DE UN FUNCIÓN LA SALTO SUMANDO AL INDICE EL TAMANIO DE LA MISMA
                if (n instanceof DecFuncion) {
                    let f: DecFuncion = <DecFuncion>n;
                    i += f.getCuerpo().length;
                    continue;
                }

                //REVISO SI HUBO UN RETORNO NO NULO QUE SOLO OCURRE CON LOS SALTO
                let a = n.Ejecutar(ts);

                //SI ES UN LLAMADA DEBO METERLA EN LA PILA
                if(a instanceof Llamada){
                    let call: Llamada = <Llamada>a;
                    llamdaAct.inicio = i + 1;
                    i = call.inicio;
                    llamdaAct = call;
                    pilaLlamadas.push(call);
                    continue;
                }

                if (a != null) {
                    i = <number>a;
                }
            }
            pilaLlamadas.pop();
        }
    }

    /**
     * Método que recolecta las funciones
     * @param ts Tabla de símbolos
     * @param AST Arbol de sintaxis abstracta
     */
    private RecolectarFuncion(ts: TablaSimbolos, AST: []): void {
        for (let i = 0; i < AST.length; i++) {
            let n: NodoAST = <NodoAST>AST[i];
            if (n instanceof DecFuncion) {
                let f: DecFuncion = <DecFuncion>n;
                ts.guardarFuncion(f, i);
            }
        }
    }

    /**
     * Función que convierte el árbol en un arreglo lineal
     * @param AST Arbol a linealizar
     */
    private Linealizar(AST: []): [] {
        let AST_nuevo: [] = [];
        for (let i = 0; i < AST.length; i++) {
            AST_nuevo.push(AST[i]);
            let nodo: NodoAST = AST[i];

            //SI EL NODO ES UN FUNCIÓN LINEALIZO SU CUERPO
            if (nodo instanceof DecFuncion) {
                let f: DecFuncion = <DecFuncion>nodo;
                for (let y = 0; y < f.getCuerpo().length; y++) {
                    AST_nuevo.push(f.getCuerpo()[y]);
                }
            }
        }
        return AST_nuevo;
    }

    private guardarEtiquetas(AST: [], ts: TablaSimbolos): void {
        for (let i = 0; i < AST.length; i++) {
            let n: NodoAST = AST[i];
            if (n instanceof Direccion) {
                ts.InsertarDireccion((<Direccion>n).getID(), i);
            }
        }
    }

}
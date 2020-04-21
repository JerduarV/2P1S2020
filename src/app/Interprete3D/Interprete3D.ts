import * as parser from 'src/Gramatica/Gramatica3D';
import { NodoAST } from './AST/NodoAST';
import { Direccion } from './Instruccion/Direccion';
import { TablaSimbolos } from './TS/TablaSimbolos';
import { Instruccion } from './Instruccion/Instruccion';

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
            AST = parser.parse(entrada3d);
            AST = this.Linealizar(AST);
            let ts: TablaSimbolos = new TablaSimbolos();
            this.guardarEtiquetas(AST,ts);
            this.Recorrer(ts,AST);
            console.log(AST);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Recorre el árbol generado del 3D
     * @param ts Tabla de símbolos
     */
    private Recorrer(ts: TablaSimbolos, AST: []):void{
        for(let i = 0; i < AST.length; i++){
            let n: Instruccion = AST[i];
            let a = n.Ejecutar(ts);
            if(a != null){
                i = <number>a;
            }
        }
    }

    /**
     * Función que convierte el árbol en un arreglo lineal
     * @param AST Arbol a linealizar
     */
    private Linealizar(AST: []):[]{
        let AST_nuevo:[] = [];
        for(let i = 0; i < AST.length; i++){
            AST_nuevo.push(AST[i]);
        }
        return AST_nuevo;
    }

    private guardarEtiquetas(AST: [], ts: TablaSimbolos):void{
        for(let i = 0; i < AST.length; i++){
            let n: NodoAST = AST[i];
            if(n instanceof Direccion){
                ts.InsertarDireccion((<Direccion>n).getID(),i);
            }
        }
    }

}
import * as parser from 'src/Gramatica/Gramatica3D';
import { DecFuncion } from './Instruccion/DecFuncion';
import { NodoAST } from './AST/NodoAST';
import { InitFun } from './Instruccion/InitFun';
import { EndFun } from './Instruccion/EndFun';

export class Optimizador {

    constructor() { }

    public Optimizar(codigo: string): void {
        try {

            let AST;
            //PARSEO
            AST = parser.parse(codigo);
            AST = this.Linealizar(AST);
            
            console.log(AST);

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Función que convierte el árbol en un arreglo lineal
     * @param AST Arbol a linealizar
     */
    private Linealizar(AST: []): NodoAST[] {
        let AST_nuevo: NodoAST[] = [];
        for (let i = 0; i < AST.length; i++) {
            let nodo: NodoAST = AST[i];
            //SI EL NODO ES UN FUNCIÓN LINEALIZO SU CUERPO
            if (nodo instanceof DecFuncion) {
                let init: InitFun = new InitFun(nodo.getID(), nodo.getFila(), nodo.getCol());
                AST_nuevo.push(init);
                nodo.getCuerpo().forEach(inst => {
                    AST_nuevo.push(inst);
                });
                AST_nuevo.push(new EndFun(nodo.getFila(), nodo.getCol()));
            } else {
                AST_nuevo.push(nodo);
            }
        }
        return AST_nuevo;
    }

}
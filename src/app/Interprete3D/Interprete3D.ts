import * as parser from 'src/Gramatica/Gramatica3D';

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
            console.log(AST);
        } catch (error) {
            console.log(error);
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

}
import * as parser from 'src/Gramatica/GramaticaJSharp';

export class CompiladorJ{
    constructor() {

    }

    /**
     * Analiza la entrada de código J#
     * @param entradaJSharp Archivo de entrada
     */
    public Analizar(entrada3d: string) {
        try {

            let AST;
            //PARSEO
            AST = parser.parse(entrada3d);

            console.log(AST);
            

        } catch (error) {
            console.log(error);
        }
    }
}
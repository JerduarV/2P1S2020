import * as parser from 'src/Gramatica/Gramatica3D';

export class Interprete3D {

    constructor() {

    }

    public Analizar(entrada3d: string) {
        try {

            let AST;
            AST = parser.parse(entrada3d);
            console.log(AST);

        } catch (error) {
            console.log(error);
        }
    }

}
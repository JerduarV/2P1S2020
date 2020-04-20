import { Expresion } from './Expresion';

export class Identificador extends Expresion{

    private id: string;

    Resolver(ts: import("../TS/TablaSimbolos").TablaSimbolos): Object {
        return ts.getValorVar(this.id);
    }

}
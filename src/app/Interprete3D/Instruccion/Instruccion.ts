import { NodoAST } from '../AST/NodoAST';
import { TablaSimbolos } from '../TS/TablaSimbolos';

export abstract class Instruccion extends NodoAST{


    /**
     * Método que implementan todas las instrucciones
     */
    public abstract Ejecutar(ts: TablaSimbolos): Object;
}
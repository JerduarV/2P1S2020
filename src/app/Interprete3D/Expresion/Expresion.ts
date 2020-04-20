import { NodoAST } from '../AST/NodoAST';
import { TablaSimbolos } from '../TS/TablaSimbolos';

export abstract class Expresion extends NodoAST{
    
    abstract Resolver(ts: TablaSimbolos):Object;
}
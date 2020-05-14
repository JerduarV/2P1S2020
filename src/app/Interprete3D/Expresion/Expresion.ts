import { NodoAST } from '../AST/NodoAST';

export abstract class Expresion extends NodoAST{
    
    public abstract getCadena(): string;

}
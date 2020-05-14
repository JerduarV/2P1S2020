import { NodoAST } from '../AST/NodoAST';
import { TablaSimbolos } from '../TS/TablaSimbolos';

export abstract class Instruccion extends NodoAST{

    protected DebeEscribirse: boolean = true;

    public abstract Escribir():void;
}
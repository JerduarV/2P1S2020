import { NodoAST } from '../AST/NodoAST';

export abstract class Instruccion extends NodoAST{

    public DebeEscribirse: boolean = true;

    public abstract Escribir():string;

    public OpimizarR818():void{
        return;
    }

    public debeEscribirse():boolean{
        return this.DebeEscribirse;
    }
}
import { ErrorLup } from './Error';

export class Consola{
    
    public salida: string = "";

    public lista_select: string[] = [];

    public lista_errores: ErrorLup[] = [];

    public Imprimir(cad: string):void{
        this.salida += ">>" + cad;
    }

    public InsertSelect(s: string):void{
        this.lista_select.push(s);
    }

    public InsertError(desc: string, tipo: string, fila: number, col: number):void{
        let e: ErrorLup = new ErrorLup(fila, col, desc, tipo);
        this.lista_errores.push(e);
    }
}
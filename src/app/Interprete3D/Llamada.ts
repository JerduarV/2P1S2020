//CLASE QUE SE USARÁ PARA TRABAJAR LA PILA DE LLAMADAS

export class Llamada{
    public inicio:number;
    public fin: number;
    
    constructor(ini:number, fin:number){
        this.inicio = ini;
        this.fin = fin;
    }
}
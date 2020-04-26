export class ElementoDisplay{
    constructor(ini: string, sal: string){
        this.etq_inicio = ini;
        this.etq_salida = sal;
    }

    etq_salida: string
    etq_inicio: string
}

export class Display{
    lista_etqs: ElementoDisplay[];
    constructor(){
        this.lista_etqs = [];
    }

    public insertar(etq_inicio: string, etq_salida: string){
        this.lista_etqs.push(new ElementoDisplay(etq_inicio,etq_salida));
    }

    public esValidoBreak():boolean{
        return this.lista_etqs.length > 0;
    }

    public esValidoContinue():boolean{
        if(this.lista_etqs.length > 0){
            if(this.lista_etqs[this.lista_etqs.length - 1].etq_inicio != null){
                return false;
            }
        }
        return false;
    }

    public sacarEtiquetas():void{
        this.lista_etqs.pop();
    }
}
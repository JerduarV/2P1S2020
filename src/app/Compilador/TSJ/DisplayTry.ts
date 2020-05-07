export class Try{
    temp: string;
    etq_catch: string;

    constructor(temp: string, etq: string){
        this.temp = temp;
        this.etq_catch = etq;
    }
}

export class DisplayTry{
    lista_try: Try[];
    
    constructor(){
        this.lista_try = [];
    }

    public insertar(t: string, etq: string){
        this.lista_try.push(new Try(t,etq));
    }

    public estoyEnTry():boolean{
        return this.lista_try.length > 0;
    }

    public sacarTry():void{
        this.lista_try.pop();
    }

    public getLastEtq():string{
        return this.lista_try[this.lista_try.length - 1].etq_catch;
    }

    public getLastTemp():string{
        return this.lista_try[this.lista_try.length - 1].temp;
    }
}
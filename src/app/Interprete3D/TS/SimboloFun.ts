export class SimboloFun{

    /**
     * Identificador
     */
    private readonly id: string;

    /**
     * Tamanio de la función
     */
    private readonly tamanio: number;

    /**
     * Posición den la que inicia
     */
    private readonly pos_inicio: number;

    /**
     * Constructor del Símbolo de una función
     * @param pos Posición en la que inicia
     * @param tam Tamanio del método
     * @param id Identificador de la función
     */
    constructor(pos: number, tam: number, id: string){
        this.id = id;
        this.tamanio = tam;
        this.pos_inicio = pos;
    }

    public getTam():number{
        return this.tamanio;
    }

    public getInicio():number{
        return this.pos_inicio;
    }

    public getId():string{
        return this.id;
    }

}
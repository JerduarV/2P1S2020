import { SimboloJ } from './SimboloJ';

export class SimbVar extends SimboloJ{

    private readonly tipo: string;
    private readonly esGlobal: boolean;
    private readonly esConstante: boolean;
    private readonly posicion: number;
    private readonly dimensiones: number;

    /**
     * Constructor del simbolo varible
     * @param nombre Nombre del simbolo
     * @param tipo Tipo de la variable
     * @param esGlobal Indica si es global
     * @param esConstante Indica si es constante
     * @param pos Posicion
     * @param dim Dimensiones
     */
    constructor(nombre: string, tipo: string, esGlobal: boolean, esConstante: boolean, pos: number, dim: number){
        super(nombre);
        this.tipo = tipo;
        this.esGlobal = esGlobal;
        this.esConstante = esConstante;
        this.posicion = pos;
        this.dimensiones = dim;
    }

    
    public getTipo() : string {
        return this.tipo;
    }

    public getEsGlobal() : boolean {
        return this.esGlobal;
    }
    
    public getEsConstante():boolean{
        return this.esConstante;
    }

    public getPosicion():number{
        return this.posicion;
    }

    public getEsArreglo():boolean{
        return this.dimensiones > 0;
    }
}
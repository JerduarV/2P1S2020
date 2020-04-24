import { SimboloJ } from './SimboloJ';
import { Tipo } from './Tipo';

export class SimbVar extends SimboloJ{

    private readonly tipo: Tipo;
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
     */
    constructor(nombre: string, tipo: Tipo, esGlobal: boolean, esConstante: boolean, pos: number, nivel: number){
        super(nombre,nivel);
        this.tipo = tipo;
        this.esGlobal = esGlobal;
        this.esConstante = esConstante;
        this.posicion = pos;
    }

    
    public getTipo() : Tipo {
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
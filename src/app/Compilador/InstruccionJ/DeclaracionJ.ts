import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { Tipo } from '../TSJ/Tipo';

export class DeclaracionJ extends InstruccionJ{

    private readonly tipo: Tipo;
    public readonly lista_ids: string[];
    private readonly constante: boolean;
    private readonly global: boolean;
    private readonly exp: ExpresionJ;

    constructor(tipo: Tipo,lista: string[], constante: boolean, global: boolean,e: ExpresionJ, fila: number, col:number){
        super(null,fila,col);
        this.tipo = tipo;
        this.lista_ids = lista;
        this.constante = constante;
        this.global = global;
        this.exp = e;
    }

    public BuscarVariablesGlobales(lista_dec: DeclaracionJ[]): void{
        if(this.esGlobal()){
            lista_dec.push(this);
        }
    }

    public Traducir(): void {
        
    }

    public getExp():ExpresionJ{
        return this.exp;
    }

    public esGlobal():boolean{
        return this.global;
    }

    public esConstante():boolean{
        return this.constante;
    }

    public esVar():boolean{
        return this.tipo == null ? false : this.tipo.isVar();
    }

    public getListaIDs():string[]{
        return this.lista_ids;
    }

    public getTipo():Tipo{
        return this.tipo;
    }

}
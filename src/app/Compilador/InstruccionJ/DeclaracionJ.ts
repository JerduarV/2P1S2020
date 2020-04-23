import { InstruccionJ } from './InstruccionJ';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';

export class DeclaracionJ extends InstruccionJ{

    private readonly tipo: string;
    private readonly lista_ids: string[];
    private readonly constante: boolean;
    private readonly global: boolean;
    private readonly exp: ExpresionJ;

    constructor(tipo: string, lista: string[], constante: boolean, global: boolean,e: ExpresionJ, fila: number, col:number){
        super(null,fila,col);
        this.tipo = tipo;
        this.lista_ids = lista;
        this.constante = constante;
        this.global = global;
        this.exp = e;
    }

    public Analizar(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        throw new Error("Method not implemented.");
    }
    public Traducir(): void {
        throw new Error("Method not implemented.");
    }

    public esGlobal():boolean{
        return this.global;
    }

    public esConstante():boolean{
        return this.constante;
    }

}
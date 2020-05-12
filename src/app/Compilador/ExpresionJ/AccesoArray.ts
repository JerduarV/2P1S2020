import { ExpresionJ } from './ExpresionJ';
import { getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';

export class AccesoArray extends ExpresionJ{

    private readonly id: string;
    private readonly indice: ExpresionJ

    constructor(id: string, indice: ExpresionJ, fila: number, col: number){
        super(fila,col);
        this.id = id;
        this.indice = indice;
    }

    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        throw new Error("Method not implemented.");
    }
    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        throw new Error("Method not implemented.");
    }

    public getId():string{
        return this.id;
    }

    public getExpIndex():ExpresionJ{
        return this.indice;
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('ACCESO_ARRAY');
        conectarNodo(padre, n);
        conectarNodo(n, getIdNodo(this.id));
        this.indice.dibujar(n);
    }
}
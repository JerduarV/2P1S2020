import { ExpresionJ } from './ExpresionJ';
import { getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';

export class Identificador extends ExpresionJ{
    
    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        throw new Error("Method not implemented.");
    }
    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        throw new Error("Method not implemented.");
    }
    private readonly id: string;

    constructor(id: string, fila: number, col: number){
        super(fila,col);
        this.id = id;
    }

    public getId():string{
        return this.id;
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo(this.id);
        conectarNodo(padre, n);
    }
}
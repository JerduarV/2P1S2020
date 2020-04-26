import { ExpresionJ } from './ExpresionJ';

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
}
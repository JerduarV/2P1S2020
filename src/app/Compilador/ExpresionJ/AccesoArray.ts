import { ExpresionJ } from './ExpresionJ';

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
}
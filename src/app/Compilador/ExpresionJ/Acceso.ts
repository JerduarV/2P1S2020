import { ExpresionJ } from './ExpresionJ';

export class Acceso extends ExpresionJ{

    private readonly lista_exp: ExpresionJ[];

    constructor(l: ExpresionJ[], fila: number, col: number){
        super(fila, col);
        this.lista_exp = l;
    }

    public Analizar(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {
        throw new Error("Method not implemented.");
    }
    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        throw new Error("Method not implemented.");
    }

}
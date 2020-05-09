import { InstruccionJ } from './InstruccionJ';

export class Import extends InstruccionJ{

    private readonly lista_ids: string[];

    constructor(lista: string[], fila: number, col:number){
        super(null,fila, col);
        this.lista_ids = lista;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        console.log('IMPORT');
        this.lista_ids.forEach(element => {
            console.log(element);
        });
    }


    public getListaFiles():string[]{
        return this.lista_ids;
    }

}
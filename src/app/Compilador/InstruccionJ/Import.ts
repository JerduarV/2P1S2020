import { InstruccionJ } from './InstruccionJ';
import { getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';

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

    public dibujar(padre: string): void {
        let n: string = getIdNodo('IMPORT');
        conectarNodo(padre, n);
        this.lista_ids.forEach(id => {
            let n_id: string = getIdNodo(id);
            conectarNodo(n, n_id);
        });
    }

}
import { SimboloJ } from './SimboloJ';
import { DecFun } from '../InstruccionJ/DecFun';

export class SimbFuncion extends SimboloJ {


    private readonly ListaDefiniciones: DecFun[];

    constructor(nombre: string) {
        super(nombre, 0);
        this.ListaDefiniciones = [];
    }

    public AgregarDef(f: DecFun): boolean {
        if (this.ListaDefiniciones.length == 0) {
            this.ListaDefiniciones.push(f);
            return true;
        } else {
            if(!this.YaExiste(f)){
                this.ListaDefiniciones.push(f);
                return true;
            }else{
                return false;
            }
        }
    }

    private YaExiste(f: DecFun): boolean {
        //RECORRO DEFINICIÓN POR DEFINICIÓN
        for (let i: number = 0; i < this.ListaDefiniciones.length; i++) {
            //SI EL NÚMERO DE PARAMETROS FORMALES COINCIDE COMPARO PARAMÉTRO POR PARÁMETRO
            if (f.getParamatrosFormales().length != this.ListaDefiniciones[i].getParamatrosFormales().length) {
                let d: DecFun = this.ListaDefiniciones[i];
                for(let y: number; y < f.getParamatrosFormales.length; y++){
                    if(!f.getParamatrosFormales()[y].getTipo().esIgualA(d.getParamatrosFormales()[y].getTipo())){
                        break;
                    }
                }
                return true;
            }
        }
        return false;
    }

}
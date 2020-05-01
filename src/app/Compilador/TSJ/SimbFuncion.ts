import { SimboloJ } from './SimboloJ';
import { DecFun } from '../InstruccionJ/DecFun';
import { Tipo } from './Tipo';

export class SimbFuncion extends SimboloJ {


    private readonly ListaDefiniciones: DecFun[];

    constructor(nombre: string) {
        super(nombre);
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

    public BuscarDefinicion(lista_tipo: Tipo[]):DecFun{
        //BUSCO FUNCIÓN CON PARÁMETROS FORMALES EXACTAMENTE IGUALES
        for(let i = 0; i < this.ListaDefiniciones.length; i++){
            let def: DecFun = this.ListaDefiniciones[i];
            if(this.CompararDefincionIgual(lista_tipo,def)){
                return def;
            }
        }

        //BUSCO FUNCIÓN CONSIDERANDO LOS CASTEOS
        for(let i = 0; i < this.ListaDefiniciones.length; i++){
            let def: DecFun = this.ListaDefiniciones[i];
            if(this.CompararDefinicionCasteo(lista_tipo,def)){
                return def;
            }
        }

        return null;
    }

    private CompararDefinicionCasteo(lista_tipo: Tipo[], def: DecFun):boolean{
        if(def.getParamatrosFormales().length != lista_tipo.length){
            return false;
        }

        for(let i = 0; i < def.getParamatrosFormales().length; i++){
            if(!def.getParamatrosFormales()[i].getTipo().AplicaCasteo(lista_tipo[i])){
                return false;
            }
        }
        return true;
    }

    public CompararDefincionIgual(lista_tipo: Tipo[], def: DecFun):boolean{
        if(def.getParamatrosFormales().length != lista_tipo.length){
            return false;
        }

        for(let i = 0; i < def.getParamatrosFormales().length; i++){
            if(!def.getParamatrosFormales()[i].getTipo().esIgualA(lista_tipo[i])){
                return false;
            }
        }
        return true;
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
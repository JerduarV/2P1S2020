import { SimboloJ } from './SimboloJ';
import { DecFun } from '../InstruccionJ/DecFun';
import { Tipo } from './Tipo';
import { ParamT2 } from '../ExpresionJ/CallFun2';

export let lista_funciones_global = [];

export class SimbFuncion extends SimboloJ {


    private readonly ListaDefiniciones: DecFun[];

    constructor(nombre: string) {
        super(nombre);
        this.ListaDefiniciones = [];
    }

    public AgregarDef(f: DecFun): boolean {
        if (this.ListaDefiniciones.length == 0) {
            this.ListaDefiniciones.push(f);
            lista_funciones_global.push(f);
            return true;
        } else {
            console.log(this.YaExiste(f));  
            if (!this.YaExiste(f)) {
                //console.log('LA AGREGUÉ')
                this.ListaDefiniciones.push(f);
                lista_funciones_global.push(f);
                return true;
            } else {
                return false;
            }
        }
    }

    public BuscarDefinicion(lista_tipo: Tipo[]): DecFun {
        //BUSCO FUNCIÓN CON PARÁMETROS FORMALES EXACTAMENTE IGUALES
        for (let i = 0; i < this.ListaDefiniciones.length; i++) {
            let def: DecFun = this.ListaDefiniciones[i];
            if (this.CompararDefincionIgual(lista_tipo, def)) {
                return def;
            }
        }

        //BUSCO FUNCIÓN CONSIDERANDO LOS CASTEOS
        for (let i = 0; i < this.ListaDefiniciones.length; i++) {
            let def: DecFun = this.ListaDefiniciones[i];
            if (this.CompararDefinicionCasteo(lista_tipo, def)) {
                return def;
            }
        }

        return null;
    }

    /**
     * 
     * @param lista_tipo Lista de parametros con nombre y tipo
     */
    public BuscarDefinicionPorNombre(lista_param: ParamT2[], lista_tipo: Tipo[]): DecFun {
        //BUSCO FUNCIÓN CON PARÁMETROS FORMALES EXACTAMENTE IGUALES
        for (let i = 0; i < this.ListaDefiniciones.length; i++) {
            let def: DecFun = this.ListaDefiniciones[i];
            if (this.ComparacionDefinicionNombreIgual(lista_param, lista_tipo, def)) {
                return def;
            }
        }

        //BUSCO FUNCIÓN CONSIDERANDO LOS CASTEOS
        for (let i = 0; i < this.ListaDefiniciones.length; i++) {
            let def: DecFun = this.ListaDefiniciones[i];
            if (this.CompararDefinicionNombreCasteo(lista_param, lista_tipo, def)) {
                return def;
            }
        }

        return null;
    }

    private ComparacionDefinicionNombreIgual(lista_param: ParamT2[], lista_tipo: Tipo[], def: DecFun): boolean {
        if (def.getParamatrosFormales().length != lista_param.length) {
            return false;
        }

        for (let i = 0; i < lista_param.length; i++) {
            if (!def.hasParametroIgual(lista_param[i].nombre, lista_tipo[i])) {
                return false;
            }
        }

        return true;
    }

    private CompararDefinicionNombreCasteo(lista_param: ParamT2[], lista_tipo: Tipo[], def: DecFun): boolean {
        if (def.getParamatrosFormales().length != lista_param.length) {
            return false;
        }

        for (let i = 0; i < lista_param.length; i++) {
            if (!def.hasParametroCasteo(lista_param[i].nombre, lista_tipo[i])) {
                return false;
            }
        }

        return true;
    }

    private CompararDefinicionCasteo(lista_tipo: Tipo[], def: DecFun): boolean {
        if (def.getParamatrosFormales().length != lista_tipo.length) {
            return false;
        }

        for (let i = 0; i < def.getParamatrosFormales().length; i++) {
            if (!def.getParamatrosFormales()[i].getTipo().AplicaCasteo(lista_tipo[i])) {
                return false;
            }
        }
        return true;
    }

    public CompararDefincionIgual(lista_tipo: Tipo[], def: DecFun): boolean {
        if (def.getParamatrosFormales().length != lista_tipo.length) {
            return false;
        }

        for (let i = 0; i < def.getParamatrosFormales().length; i++) {
            if (!def.getParamatrosFormales()[i].getTipo().esIgualA(lista_tipo[i])) {
                return false;
            }
        }
        return true;
    }

    private YaExiste(f: DecFun): boolean {
        //RECORRO DEFINICIÓN POR DEFINICIÓN
        for (let i: number = 0; i < this.ListaDefiniciones.length; i++) {

            //SI EL NÚMERO DE PARAMETROS FORMALES COINCIDE COMPARO PARAMÉTRO POR PARÁMETRO
            if (f.getParamatrosFormales().length == this.ListaDefiniciones[i].getParamatrosFormales().length) {

                let d: DecFun = this.ListaDefiniciones[i];
                let bandera: boolean = true;

                for (let y: number = 0; y < f.getParamatrosFormales().length; y++) {
                    console.log(f.getParamatrosFormales()[y].getTipo().getString());
                    console.log(d.getParamatrosFormales()[y].getTipo().getString());
                    if (!f.getParamatrosFormales()[y].getTipo().esIgualA(d.getParamatrosFormales()[y].getTipo())) {
                        bandera = false;
                        break;
                    }

                }

                if (bandera) {
                    return true;
                }

            }
        }
        return false;
    }

}
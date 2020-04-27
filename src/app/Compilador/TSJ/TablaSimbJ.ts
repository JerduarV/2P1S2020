import { SimboloJ } from './SimboloJ';
import { SimbVar } from './SimbVar';
import { Consola } from 'src/app/Auxiliares/Consola';
import { Tipo } from './Tipo';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { SimbFuncion } from './SimbFuncion';
import { DecFun } from '../InstruccionJ/DecFun';
import { Display } from './Display';

export function NewTablaLocal(padre: TablaSimbJ): TablaSimbJ {
    let t: TablaSimbJ = new TablaSimbJ(padre.getArchivo(), padre.getConsola());
    t.padre = padre;
    t.nivel_actual = padre.nivel_actual + 1;
    t.tam_fun_actual = padre.tam_fun_actual;
    t.etq_fun_salida = padre.etq_fun_salida;
    t.display = padre.display;
    t.funcion_actual = padre.funcion_actual;
    return t;
}

export class TablaSimbJ {

    private readonly Archivo: string;
    private readonly consola: Consola;
    private readonly tabla: Map<string, SimboloJ>
    public nivel_actual: number;
    public tam_fun_actual: number;
    public etq_fun_salida: string;
    public padre: TablaSimbJ;
    public display: Display;
    public funcion_actual: DecFun;

    /**
     * Cosntructor de la tabla de simbolos
     * @param file Archivo al que pertenece
     * @param con Consola para la impresión y reporte de errores
     */
    constructor(file: string, con: Consola) {
        this.tabla = new Map();
        this.Archivo = file;
        this.consola = con;
        this.nivel_actual = 0;
        this.tam_fun_actual = -1;
        this.etq_fun_salida = '';
        this.padre = null;
        this.display = new Display();
        this.funcion_actual = null;
    }

    public BuscarVariable(id: string): SimbVar{
        let key: string = this.getKeyVar('var',id);
        if(this.tabla.has(key)){
            return <SimbVar>this.tabla.get(key);
        }else{
            if(this.padre != null){
                return this.padre.BuscarVariable(id);
            }
            return null;
        }
    }

    /**
     * Método para guardar una variable en la tabla de símbolos de J#
     * @param nombre Nombre de la variable
     * @param tipo Tipo de dato
     * @param esGlobal Si es global
     * @param esConstante Si es constante
     * @param pos Posición
     * @param dim Dimensión
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    public GuardarVarible(nombre: string, tipo: Tipo, esGlobal: boolean, esConstante: boolean, pos: number, fila: number, col: number): SimbVar {
        let key: string = this.getKeyVar('var', nombre);
        if (!this.tabla.has(key)) {
            let s: SimbVar = new SimbVar(nombre, tipo, esGlobal, esConstante, pos, this.nivel_actual);
            this.tabla.set(key, s);
            return s;
        }
        this.consola.InsertError('Ya existe la variable' + nombre, 'Semantico', fila, col);
        return null;
    }

    /**
     * Método para guardar una función en la tabla de símbolos
     * @param fun Función a guarda
     */
    public GuardarFuncion(fun: DecFun): Object {
        let key: string = this.getKeyVar('fun', fun.getNombre());
        if (!this.tabla.has(key)) {
            let f: SimbFuncion = new SimbFuncion(fun.getNombre());
            f.AgregarDef(fun);
            console.log('Se agregó ' + fun.getNombre());
        } else {
            let f: SimbFuncion = <SimbFuncion>this.tabla.get(key);
            let b: boolean = f.AgregarDef(fun);
            if (b) {
                console.log('Se agregó ' + fun.getNombre());
                return null;
            } else {
                return this.GenerarError('Ya existe la función ' + fun.getNombre(), fun.getFila(), fun.getCol());
            }
        }
    }

    //METODOS DE GET

    public getKeyVar(rol: string, id: string): string {
        return (rol + '$' + id).toUpperCase();
    }

    public getArchivo(): string {
        return this.Archivo;
    }

    public GenerarError(desc: string, fila: number, col: number): ErrorLup {
        return this.consola.InsertError(desc, 'Semantico', fila, col);
    }

    public getTamanioFunActual(): number {
        //SIGNIFICA QUE ESTOY EN EL AMBIENTE GLOBAL
        if (this.tam_fun_actual == -1) {
            return 0;
        }
        return this.tam_fun_actual;
    }

    public getConsola(): Consola {
        return this.consola;
    }

    /**
     * Retorna si un tipo existe o no
     * @param tipo Tipo a valida
     */
    public getExisteTipo(tipo: Tipo): boolean {
        return tipo.esNativo();
    }

    public esValidaBreak():boolean{
        return this.display.esValidoBreak();
    }

    public esValidoContinue():boolean{
        return this.display.esValidoContinue();
    }

    public getEtqSalida():string{
        return this.display.lista_etqs[this.display.lista_etqs.length - 1].etq_salida;
    }

    public getEtqInicio():string{
        return this.display.lista_etqs[this.display.lista_etqs.length - 1].etq_inicio;
    }
}
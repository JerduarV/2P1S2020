import { SimboloJ } from './SimboloJ';
import { SimbVar } from './SimbVar';
import { Consola } from 'src/app/Auxiliares/Consola';
import { Tipo } from './Tipo';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { SimbFuncion } from './SimbFuncion';
import { DecFun } from '../InstruccionJ/DecFun';
import { Display } from './Display';
import { DefStruct } from '../InstruccionJ/DefStruct';

export function NewTablaLocal(padre: TablaSimbJ): TablaSimbJ {
    let t: TablaSimbJ = new TablaSimbJ(padre.getArchivo(), padre.getConsola());
    t.padre = padre;
    t.tam_fun_actual = padre.tam_fun_actual;
    t.etq_fun_salida = padre.etq_fun_salida;
    t.display = padre.display;
    t.funcion_actual = padre.funcion_actual;
    t.tabla_temporales = padre.tabla_temporales;
    t.tabla_structs = padre.tabla_structs;
    t.tam_fun_total = padre.tam_fun_total;
    t.temp_true = padre.temp_true;
    t.temp_false = padre.temp_false;
    t.temp_null = padre.temp_null;
    return t;
}

export class TablaSimbJ {

    private readonly Archivo: string;
    private readonly consola: Consola;
    private readonly tabla: Map<string, SimboloJ>
    public tam_fun_actual: number;
    public tam_fun_total: number;
    public etq_fun_salida: string;
    public padre: TablaSimbJ;
    public display: Display;
    public funcion_actual: DecFun;
    public temp_true: string;
    public temp_false: string;
    public temp_null: string;
    public tabla_temporales: Map<string,string>;
    public tabla_structs: Map<string,DefStruct>;

    /**
     * Cosntructor de la tabla de simbolos
     * @param file Archivo al que pertenece
     * @param con Consola para la impresión y reporte de errores
     */
    constructor(file: string, con: Consola) {
        this.tabla = new Map();
        this.Archivo = file;
        this.consola = con;
        this.tam_fun_actual = -1;
        this.tam_fun_total = 0;
        this.etq_fun_salida = '';
        this.padre = null;
        this.display = new Display();
        this.funcion_actual = null;
        this.tabla_temporales = new Map();
        this.tabla_structs = new Map();
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
            let s: SimbVar = new SimbVar(nombre, tipo, esGlobal, esConstante, pos);
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
            //console.log('Se agregó ' + fun.getNombre());
        } else {
            let f: SimbFuncion = <SimbFuncion>this.tabla.get(key);
            let b: boolean = f.AgregarDef(fun);
            if (b) {
                //console.log('Se agregó ' + fun.getNombre());
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

    public getTamanioFunTotal(): number {
        return this.tam_fun_total;
    }

    /**
     * Método que guarda una estructura en la tabla de símbolo
     * @param strc Struct que se quiere guardar
     */
    public GuardarStruct(strc: DefStruct):void{
        let key: string = strc.getId().toUpperCase();
        if(this.tabla_structs.has(key)){
            this.GenerarError('Ya existe el struct: ' + strc.getId(), strc.getFila(),strc.getCol());
        }
        this.tabla_structs.set(key,strc);
    }

    public getConsola(): Consola {
        return this.consola;
    }

    /**
     * Función que saca los temporales
     * @param temp Temporal a sacar
     */
    public  SacarTemporal(temp: string):void{
        if(this.tabla_temporales.has(temp)){
            this.tabla_temporales.delete(temp);
            return;
        }
        console.log('No existe el temporal ' + temp);
    }

    /**
     * Método que guarda temporales
     * @param temp Temporal a guardar
     */
    public guardarTemporal(temp: string):void{
        if(this.tabla_temporales.has(temp)){
            console.log('Ya existe este temporal : ' + temp);
            return;
        }
        this.tabla_temporales.set(temp,temp);
    }

    /**
     * Retorna si un tipo existe o no
     * @param tipo Tipo a valida
     */
    public getExisteTipo(tipo: Tipo): boolean {
        return tipo.esNativo() || this.tabla_structs.has(tipo.getNombreTipo().toUpperCase());
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
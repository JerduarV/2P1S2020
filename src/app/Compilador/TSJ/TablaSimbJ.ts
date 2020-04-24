import { SimboloJ } from './SimboloJ';
import { SimbVar } from './SimbVar';
import { Consola } from 'src/app/Auxiliares/Consola';
import { Tipo } from './Tipo';
import { ErrorLup } from 'src/app/Auxiliares/Error';

export class TablaSimbJ{

    private readonly Archivo: string;
    private readonly consola: Consola;
    private readonly tabla : Map<string,SimboloJ>
    public nivel_actual: number;

    /**
     * Cosntructor de la tabla de simbolos
     * @param file Archivo al que pertenece
     * @param con Consola para la impresión y reporte de errores
     */
    constructor(file: string, con: Consola){
        this.tabla = new Map();
        this.Archivo = file;
        this.consola = con;
        this.nivel_actual = 0;
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
    public GuardarVarible(nombre: string, tipo: Tipo, esGlobal: boolean, esConstante: boolean, pos: number, fila: number, col:number): SimbVar{
        let key: string = this.getKeyVar('var',nombre);
        if(!this.tabla.has(key)){
            let s: SimbVar = new SimbVar(nombre,tipo,esGlobal,esConstante,pos,this.nivel_actual);
            this.tabla.set(key, s);
            return s;
        }
        this.consola.InsertError('Ya existe la variable' + nombre, 'Semantico',fila, col);
        return null;
    }

    //METODOS DE GET

    public getKeyVar(rol:string, id:string):string{
        return (rol + '$' + id).toUpperCase();
    }

    public getArchivo():string{
        return this.Archivo;
    }

    public GenerarError(desc: string, fila: number, col: number):ErrorLup{
        return this.consola.InsertError('desc','Semantico',fila,col);
    }
}
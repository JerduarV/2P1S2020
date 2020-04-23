import { SimboloJ } from './SimboloJ';
import { SimbVar } from './SimbVar';
import { Consola } from 'src/app/Auxiliares/Consola';

export class TablaSimbJ extends Map<string, SimboloJ>{

    private readonly Archivo: string;
    private readonly consola: Consola;

    /**
     * Cosntructor de la tabla de simbolos
     * @param file Archivo al que pertenece
     * @param con Consola para la impresión y reporte de errores
     */
    constructor(file: string, con: Consola){
        super();
        this.Archivo = file;
        this.consola = con;
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
    public GuardarVarible(nombre: string, tipo: string, esGlobal: boolean, esConstante: boolean, pos: number, dim: number,fila: number, col:number){
        let key: string = this.getKeyVar('var',nombre);
        if(!this.has(key)){
            this.set(key, new SimbVar(nombre,tipo,esGlobal,esConstante,pos,dim));
            return;
        }
        this.consola.InsertError('No existe la variable' + nombre, 'Semantico',fila, col);
    }

    //METODOS DE GET

    public getKeyVar(rol:string, id:string):string{
        return (rol + '$' + id).toUpperCase();
    }

    public getArchivo():string{
        return this.Archivo;
    }
}
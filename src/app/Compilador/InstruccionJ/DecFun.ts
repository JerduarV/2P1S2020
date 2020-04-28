import { InstruccionJ } from './InstruccionJ';
import { Tipo } from '../TSJ/Tipo';
import { ParametroFormal } from '../TSJ/ParametroFormal';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { TablaSimbJ, NewTablaLocal } from '../TSJ/TablaSimbJ';
import { concatCodigo, getEtiqueta } from 'src/app/Auxiliares/Utilidades';

export class DecFun extends InstruccionJ {

    private readonly TipoRet: Tipo;
    private readonly nombre: string;
    private parametroFormales: ParametroFormal[];
    public tamanio: number;

    /**
     * Constructor de la Declaración de una función
     * @param t Tipo de retorno
     * @param nombre Nombre de la función
     * @param p Lista de parámetros formales
     * @param cuerpo cuerpo de la función
     * @param fila fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(t: Tipo, nombre: string, p: ParametroFormal[], cuerpo: NodoASTJ[], fila: number, col: number) {
        super(cuerpo, fila, col);
        this.TipoRet = t;
        this.nombre = nombre;
        this.parametroFormales = p;
        this.tamanio = 1 + this.parametroFormales.length;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        ts.tam_fun_actual = 1 + this.parametroFormales.length;
        let etq_salida = getEtiqueta();
        ts.etq_fun_salida = etq_salida;
        ts.funcion_actual = this;
        ts.tabla_temporales = new Map();
        concatCodigo('\nproc ' + this.nombre + this.concatTipo() + ' begin');
        this.TraducirCuerpo(NewTablaLocal(ts));
        concatCodigo('\n' + ts.etq_fun_salida + ':\nend\n');
        ts.tam_fun_actual = -1;
    }

    public concatTipo():string{
        let cad: string = '';
        for(let i = 0; i < this.parametroFormales.length; i++){
            cad += '_' + this.parametroFormales[i].getTipo().getNombreTipo();
        }
        return cad;
    }

    /**
     * Función que hace un análsis previo para validar la metadata de la función
     * @param ts Tabla de símbolos
     */
    public preAnalisis(ts: TablaSimbJ):void{

        let hubo_error: boolean = false;

        //VALIDO SI EL TIPO DE RETORNO EXISTE
        if (!ts.getExisteTipo(this.TipoRet)) {
            ts.GenerarError('No existe el tipo de la función : ' + this.TipoRet.getString(), + this.getFila(), this.getCol());
            hubo_error = true;
        }

        //VALIDO QUE NO HAYA PARAMETROS CON EL MISMO NOMBRE USANDO UN MAP
        let mapa: Map<string, string> = new Map();
        for (let i: number = 0; i < this.parametroFormales.length; i++) {
            let param: ParametroFormal = this.parametroFormales[i];
            if (mapa.has(param.nombre.toUpperCase())) {
                ts.GenerarError('Ya hay un parámetro con nombre' + param.nombre, this.getFila(), this.getCol());
                hubo_error = true;
            }else{
                mapa.set(param.nombre.toUpperCase(),param.nombre.toUpperCase());
            }

            //VALIDO QUE EXISTA EL TIPO DEL PARÁMETRO
            if(!ts.getExisteTipo(param.getTipo())){
                ts.GenerarError('No existe el tipo del parametro ' + param.nombre + ' : ' + param.getTipo().getString(), this.getFila(), this.getCol());
                hubo_error = true;
            }
        }

        //SI TODO LO DEMÁS ESTA BIEN TRATO DE GUARDAR LA FUNCIÓN EN LA TABLA DE SÍMBOLOS
        if(!hubo_error){
            let o: Object = ts.GuardarFuncion(this);
        }
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getParamatrosFormales(): ParametroFormal[] {
        return this.parametroFormales;
    }

    public getTipoRet(): Tipo {
        return this.TipoRet;
    }

}
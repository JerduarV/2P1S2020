export class TablaSimbolos{
    
    /**
     * Arreglos para la ejecución en bajo nivel
     */
    private HEAP: number[];
    private STACK: number[];
    
    /**
     * Tabla de temporales
     */
    private readonly Temporales:Map<string, Object>;

    /**
     * Tabla de direcciones
     */
    private readonly tablaDirecciones: Map<string, number>;
    
    /**
     * Constructor de la tabla de símbolos
     */
    constructor(){
        this.Temporales = new Map();
        this.tablaDirecciones = new Map();
        this.HEAP = [];
        this.STACK = [];
    }

    /**
     * Guarda una nueva variable en la tabla de simbolos
     * @param id Identficador de la variable
     * @param val Valor que puede ser null
     */
    public InsertarVar(id: string, val: number):void{
        if(!this.Temporales.get("var$" + id)){
            this.Temporales.set('var$' + id,val);
        }
    }

    /**
     * Retorna el valor de la variable en la tabla de simbolos
     * @param id Identficador de la variable
     */
    public getValorVar(id: string):number{
        //console.log('buscando ' + id);
        if(this.Temporales.has('var$' + id)){
            let n: number = <number>this.Temporales.get('var$'+id);
            console.log(n);
            return n;
        }
        return -1;
    }

    /**
     * Método que cambiar el valor de un temporal
     * @param id Identificador del temporal
     * @param val Valor nuevo
     */
    public setValorVar(id: string, val: number):void{
        if(this.Temporales.has('var$' + id)){
            this.Temporales.set('var$' + id, val);
        }
    }

    /**
     * Método para guardar la etiquetas con sus direcciones
     * @param label Etiqueta que se va a guardar
     * @param index Índice asociado a la etiqueta
     */
    public InsertarDireccion(label: string, index: number):void{
        if(!this.tablaDirecciones.has(label)){
            this.tablaDirecciones.set(label,index);
            //console.log('Etiqueta ' + label + ' : ' + index);
        }
    }
}
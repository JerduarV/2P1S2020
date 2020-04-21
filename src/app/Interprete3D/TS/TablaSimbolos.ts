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
        if(!this.Temporales.get("var$" + id.toUpperCase())){
            this.Temporales.set('var$' + id.toUpperCase(),val);
        }
    }

    /**
     * Retorna el valor de la variable en la tabla de simbolos
     * @param id Identficador de la variable
     */
    public getValorVar(id: string):number{
        //console.log('buscando ' + id);
        if(this.Temporales.has('var$' + id.toUpperCase())){
            let n: number = <number>this.Temporales.get('var$'+id.toUpperCase());
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
        if(this.Temporales.has('var$' + id.toUpperCase())){
            this.Temporales.set('var$' + id.toUpperCase(), val);
        }
    }

    /**
     * Método para guardar la etiquetas con sus direcciones
     * @param label Etiqueta que se va a guardar
     * @param index Índice asociado a la etiqueta
     */
    public InsertarDireccion(label: string, index: number):void{
        if(!this.tablaDirecciones.has(label.toUpperCase())){
            this.tablaDirecciones.set(label.toUpperCase(),index);
            //console.log('Etiqueta ' + label + ' : ' + index);
        }
    }

    /**
     * Función que accede un posición del heap
     * @param index Retorna la posición úbicada en el índice
     * index
     */
    public getHeap(index: number):number{
        return this.HEAP[index];
    }

    /**
     * Función que accede un posición del stack
     * @param index Retorna la posición úbicada en el índice
     * index
     */
    public getStack(index: number):number{
        return this.STACK[index];
    }

    /**
     * Método que setea un valor en el heap
     * @param index Indice al que se setea
     * @param val Valor a insertar
     */
    public setHeap(index: number, val: number):void{
        this.HEAP[index] = val;
    }

    /**
     * Método que setea un valor en el stack
     * @param index Indice al que se setea
     * @param val Valor a insertar
     */
    public setStack(index: number, val: number):void{
        this.STACK[index] = val;
    }

    /**
     * Función que retorna el índice asociado a una etiqueta
     * @param label Nombre de la etiqueta
     */
    public getLabel(label: string):number{
        if(this.tablaDirecciones.has(label.toUpperCase())){
            return this.tablaDirecciones.get(label.toUpperCase());
        }
        return null;
    }
}
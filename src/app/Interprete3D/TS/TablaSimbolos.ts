export class TablaSimbolos extends Map{
    
    /**
     * Arreglos para la ejecución en bajo nivel
     */
    private HEAP: number[];
    private STACK: number[];

    /**
     * Tabla de direcciones
     */
    private readonly tablaDirecciones: Map<string, number>;
    
    constructor(){
        super();
        this.HEAP = [];
        this.STACK = [];
        this.tablaDirecciones = new Map();
    }

    /**
     * Guarda una nueva variable en la tabla de simbolos
     * @param id Identficador de la variable
     * @param val Valor que puede ser null
     */
    public InsertarVar(id: string, val: number):void{
        if(!this.get("var$" + id)){
            this.set(id,val);
        }
    }

    /**
     * Retorna el valor de la variable en la tabla de simbolos
     * @param id Identficador de la variable
     */
    public getValorVar(id: string):Object{
        return this.get('var$'+id);
    }

    /**
     * Método que cambiar el valor de un temporal
     * @param id Identificador del temporal
     * @param val Valor nuevo
     */
    public setValorVar(id: string, val: number):void{
        if(this.has(id)){
            this.set(id, val);
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
        }
    }
}
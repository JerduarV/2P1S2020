export class TablaSimbolos extends Map{
    
    /**
     * Arreglos para la ejecución en bajo nivel
     */
    private HEAP: number[];
    private STACK: number[];
    
    constructor(){
        super();
        this.HEAP = [];
        this.STACK = [];
    }

    /**
     * Guarda una nueva variable en la tabla de simbolos
     * @param id Identficador de la variable
     * @param val Valor que puede ser null
     */
    public InsertarVar(id: string, val: Object):void{
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
}
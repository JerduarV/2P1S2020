export class Archivo{

    /**
     * Nombre del Archivo
     */
    private nombre: string;

    /**
     * Contenido del archivo
     */
    private contenido: string;

    public constructor(){
        this.nombre = '';
        this.contenido = '';
    }

    public setNombre(n: string): void{
        this.nombre = n;
    }

    public setContenido(n: string): void{
        this.contenido = n;
    }

    public getNombre():string{
        return this.nombre;
    }

    public getContenido():string{
        return this.contenido;
    }
}
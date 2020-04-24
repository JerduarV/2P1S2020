export abstract class SimboloJ {
    /**
     * Nombre propio del simbolo
     */
    private readonly nombre: string;

    private readonly nivel: number;

    /**
     * Constructor de la clase SimboloJ
     * @param nombre Nombre propio
     */
    constructor(nombre: string, nivel: number) {
        this.nombre = nombre;
        this.nivel = nivel;
    }

    /**
     * GETERS DE LOS ATRIBUTOS
     */

    public getNombre(): string {
        return this.nombre;
    }
}
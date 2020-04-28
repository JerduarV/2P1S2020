export abstract class SimboloJ {
    /**
     * Nombre propio del simbolo
     */
    private readonly nombre: string;

    /**
     * Constructor de la clase SimboloJ
     * @param nombre Nombre propio
     */
    constructor(nombre: string) {
        this.nombre = nombre;
    }

    /**
     * GETERS DE LOS ATRIBUTOS
     */

    public getNombre(): string {
        return this.nombre;
    }
}
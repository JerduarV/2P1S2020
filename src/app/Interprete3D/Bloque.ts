import { Instruccion } from './Instruccion/Instruccion';

export let cont: number = 0;

export let dot_bloque: string = '';

export function getBlockId(): string {
    return 'bloque' + cont++;
}

export function ConstruirDot(ListaBloque: Bloque[]): void {
    dot_bloque = '';
    ListaBloque.forEach(element => {
        element.DibujarBloque();
    });
    dot_bloque = 'digraph G{\n\tnode [shape="box",color=salmon2,style = filled]\n' + dot_bloque + '}\n';
}

export class Bloque {

    lista_inst: Instruccion[];
    conexiones: string[]
    hijos: Bloque[]
    id: string;

    constructor() {
        this.lista_inst = [];
        this.id = getBlockId();
        this.hijos = [];
        this.conexiones = [];
    }

    public DibujarBloque(): void {
        //concat_dot("\t\"" + id + "\" [label = \"" + label + "\"];\n");
        let label: string = 'bloque: ' + this.id + '\n';

        this.lista_inst.forEach(nodo => {
            label += nodo.Escribir().replace(/\"/g, '\\"');
        });
        dot_bloque += `\t"${this.id}" [label = "${label}"];\n`;

        this.conexiones.forEach(c => {
            dot_bloque += `${this.id} -> ${c};\n`
        });

        this.hijos.forEach(c => {
            dot_bloque += `${this.id} -> ${c.id};\n`
        });
    }

}
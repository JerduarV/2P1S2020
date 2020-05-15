import { InstruccionJ } from './InstruccionJ';
import { Tipo } from '../TSJ/Tipo';
import { ExpresionJ } from '../ExpresionJ/ExpresionJ';
import { concatCodigo, genTemp, getTempAct, getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { TablaSimbJ, NewTablaLocal } from '../TSJ/TablaSimbJ';

export class Atributo {
    public readonly id: string;
    public readonly tipo: Tipo;
    public readonly exp: ExpresionJ;

    public fila: number;
    public col: number;

    constructor(t: Tipo, id: string, exp: ExpresionJ, fila: number, col: number) {
        this.tipo = t;
        this.id = id.toUpperCase();
        this.exp = exp;
        this.fila = fila;
        this.col = col;
    }
}

export class DefStruct extends InstruccionJ {

    private readonly id: string;
    private readonly lista_atrib: Atributo[];
    private readonly tamanio: number;

    constructor(id: string, lista: Atributo[], fila: number, col: number) {
        super(null, fila, col);
        this.id = id;
        this.lista_atrib = lista;
        this.tamanio = lista.length;
    }

    public RecolectarStruct(lista: DefStruct[]): void {
        lista.push(this);
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {

        //#region VALIDACIONES
        //VALIDAR QUE LOS TIPOS DE LOS ATRIBUTOS EXISTAN
        this.lista_atrib.forEach(atrib => {
            if (!ts.getExisteTipo(atrib.tipo)) {
                ts.GenerarError('No existe el tipo: ' + atrib.tipo.getString(), atrib.fila, atrib.col);
                return;
            }
        });

        //VALIDAR QUE ATRIBUTOS NO SE LLAMEN IGUAL
        let mapa: Map<string, string> = new Map();
        this.lista_atrib.forEach(atrib => {
            if (mapa.has(atrib.id.toUpperCase())) {
                ts.GenerarError('Ya existe el atributo ' + atrib.id, atrib.fila, atrib.col);
                return;
            }
            mapa.set(atrib.id, atrib.id);
        });
        //#endregion

        let t1: string = genTemp();
        ts.guardarTemporal(t1);

        //CODIGO POR DEFECTO
        concatCodigo('proc jerduarCons_' + this.id.toUpperCase() + ' begin');
        concatCodigo(t1 + ' = H;');

        if (this.lista_atrib.length == 0) {
            concatCodigo('H = H + 1;');
        }

        this.lista_atrib.forEach(atrib => {
            concatCodigo('Heap[H] = ' + atrib.tipo.getValDefecto() + ';');
            concatCodigo('H = H + 1;');
        });

        if (this.HayValores()) {
            let local: TablaSimbJ = NewTablaLocal(ts);
            local.tam_fun_actual = 1 + this.lista_atrib.length;
            ts.tam_fun_total = this.tamanio;

            let contador = 1;
            //GUARDANDO LA LISTA DE ATRIBUTOS
            this.lista_atrib.forEach(atrib => {
                local.GuardarVarible(atrib.id, atrib.tipo, false, false, contador++, atrib.fila, atrib.col, true);
            });

            //PASO DEL HEAP AL STACK
            for (let i = 0; i < this.lista_atrib.length; i++) {
                let t2: string = genTemp();
                let t3: string = genTemp();
                let t4: string = genTemp();

                concatCodigo(t2 + ' = P + ' + (i + 1) + ';');
                concatCodigo(t3 + ' = ' + t1 + ' + ' + i + ';');
                concatCodigo(t4 + ' = Heap[' + t3 + '];');
                concatCodigo('Stack[' + t2 + '] = ' + t4 + ';');
            }

            //EJECUCIÓN DE EXP Y ASIG (AL STACK)
            for (let i = 0; i < this.lista_atrib.length; i++) {
                let atributo: Atributo = this.lista_atrib[i];
                if (atributo.exp == null) {
                    continue;
                }
                let o: Object = atributo.exp.getTipo(ts);
                if (o instanceof ErrorLup) {
                    continue;
                }
                let tipo: Tipo = <Tipo>o;
                if (!atributo.tipo.esIgualA(tipo)) {
                    ts.GenerarError('El tipo del atributo no coincide', atributo.fila, atributo.col);
                    continue;
                }

                //TRADUCCIÓN DE EXP
                atributo.exp.Traducir(ts);
                let temp_r: string = getTempAct();
                let temp_pos: string = genTemp();

                //ASIGNANDO EL VALOR AL STACK
                concatCodigo(temp_pos + ' = P + ' + (i + 1) + ';');
                concatCodigo('Stack[' + temp_pos + '] = ' + temp_r + ';');
                ts.SacarTemporal(temp_r);
            }

            //PASO DEL STACK AL HEAP
            for (let i = 0; i < this.lista_atrib.length; i++) {
                let t2: string = genTemp();
                let t3: string = genTemp();
                let t4: string = genTemp();

                concatCodigo(t2 + ' = ' + t1 + ' + ' + i + ';');
                concatCodigo(t3 + ' = P + ' + (i + 1) + ';');
                concatCodigo(t4 + ' = Stack[' + t3 + '];');
                concatCodigo('Heap[' + t2 + '] = ' + t4 + ';');
            }
        }

        concatCodigo('Stack[P] = ' + t1 + ';');
        concatCodigo('\nend\n\n');
        ts.SacarTemporal(t1);
    }

    private HayValores(): boolean {
        for (let i = 0; i < this.lista_atrib.length; i++) {
            if (this.lista_atrib[i].exp != null) {
                return true;
            }
        }
        return false;
    }

    public getId(): string {
        return this.id;
    }

    public getPosAtributo(id: string): number {
        for (let i = 0; i < this.lista_atrib.length; i++) {
            const atrib = this.lista_atrib[i];
            if (atrib.id.toUpperCase() == id.toUpperCase()) {
                return i;
            }
        }
        return -1;
    }

    public getAtributo(id: string): Tipo {
        for (let i = 0; i < this.lista_atrib.length; i++) {
            const atrib = this.lista_atrib[i];
            if (atrib.id.toUpperCase() == id.toUpperCase()) {
                return atrib.tipo;
            }
        }
        return null;
    }

    public getSize(): number {
        return this.lista_atrib.length;
    }

    public getAtributosReporte(): string {
        let cad: string = '';
        this.lista_atrib.forEach(atrib => {
            cad += '| ' + atrib.id + ' : ' + atrib.tipo.getString() + ' \n';
        });
        return cad;
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('DEF_STRC');
        conectarNodo(padre, n);

        conectarNodo(n, getIdNodo(this.id));

        let atrib: string = getIdNodo('L_ATRIB');
        conectarNodo(n, atrib);

        this.lista_atrib.forEach(atributo => {
            let a: string = getIdNodo(atributo.id + ':' + atributo.tipo.getString());
            conectarNodo(atrib, a);
            if (atributo.exp != null) {
                atributo.exp.dibujar(a);
            }
        });
    }

}
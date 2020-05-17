import { InstruccionJ } from './InstruccionJ';
import { NodoASTJ } from '../ASTJ/NodoASTJ';
import { ParametroFormal } from '../TSJ/ParametroFormal';
import { NewTablaLocal, TablaSimbJ } from '../TSJ/TablaSimbJ';
import { genTemp, getEtiqueta, concatCodigo, getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';
import { NULLPOINTEREX, ARITHMETICEX, INDEXOUTOFBOUNDEX, INVALIDCASTINGEXCEPTION, UNCAUGTHEX, HEAPOVERFLOWERROR, STACKOVERFLOWERROR } from '../TSJ/Tipo';
import { DeclaracionJ } from './DeclaracionJ';
import { DefStruct } from './DefStruct';
import { DecFun } from './DecFun';

export class TryCatch extends InstruccionJ {

    private readonly cuerpoCatch: NodoASTJ[];
    private readonly parametrosCatch: ParametroFormal[];

    constructor(cuerpo: NodoASTJ[], param: ParametroFormal[], c: NodoASTJ[], fila: number, col: number) {
        super(cuerpo, fila, col);
        this.parametrosCatch = param;
        this.cuerpoCatch = c;
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {

        let local: TablaSimbJ = NewTablaLocal(ts);
        let terror: string = genTemp();
        let etq_catch: string = getEtiqueta();
        let etq_salida: string = getEtiqueta();
        let etq_v: string = getEtiqueta();
        let etq_f: string = getEtiqueta();

        local.displayTry.insertar(terror, etq_catch);
        concatCodigo(terror + ' = 0;');
        this.TraducirCuerpo(local);
        concatCodigo('goto ' + etq_salida + ';');
        local.displayTry.sacarTry();

        //TRADUCCIÓN CATCH
        concatCodigo(etq_catch + ':');
        this.parametrosCatch.forEach(param => {
            switch (param.getTipo().getNombreTipo().toUpperCase()) {
                case NULLPOINTEREX:
                    concatCodigo('if(' + terror + ' == 4) goto ' + etq_v + ';');
                    break;
                case ARITHMETICEX:
                    concatCodigo('if(' + terror + ' == 1) goto ' + etq_v + ';');
                    break;
                case INDEXOUTOFBOUNDEX:
                    concatCodigo('if(' + terror + ' == 2) goto ' + etq_v + ';');
                    break;
                case INVALIDCASTINGEXCEPTION:
                    concatCodigo('if(' + terror + ' == 5) goto ' + etq_v + ';');
                    break;
                case UNCAUGTHEX:
                    concatCodigo('if(' + terror + ' == 3) goto ' + etq_v + ';');
                    break;
                case HEAPOVERFLOWERROR:
                    concatCodigo('if(' + terror + ' == 6) goto ' + etq_v + ';');
                    break;
                case STACKOVERFLOWERROR:
                    concatCodigo('if(' + terror + ' == 7) goto ' + etq_v + ';');
                    break;
            }
        });
        concatCodigo('goto ' + etq_f + ';');
        concatCodigo(etq_v + ':');
        let local_catch: TablaSimbJ = NewTablaLocal(ts);
        this.cuerpoCatch.forEach(element => {
            element.Traducir(local_catch);
        });
        concatCodigo('goto ' + etq_salida + ';')

        concatCodigo(etq_f + ':');
        if (ts.displayTry.estoyEnTry()) {
            concatCodigo(ts.displayTry.getLastTemp() + ' = ' + terror + ';');
            concatCodigo('goto ' + ts.displayTry.getLastEtq() + ';');
        } else {
            concatCodigo('E = ' + terror + ';');
        }

        concatCodigo(etq_salida + ':');

        //console.log('NO TENGO TRADUCCIÓN');
    }

    public BuscarVariablesGlobales(lista_dec: DeclaracionJ[], ts: TablaSimbJ): void {
        super.BuscarVariablesGlobales(lista_dec, ts);
        let local: TablaSimbJ = NewTablaLocal(ts);
        for (let i = 0; i < this.cuerpoCatch.length; i++) {
            if (this.cuerpoCatch[i] instanceof InstruccionJ) {
                (<InstruccionJ>this.cuerpoCatch[i]).BuscarVariablesGlobales(lista_dec, local);
            }
        }
    }

    public RecolectarStruct(lista: DefStruct[]): void {
        super.RecolectarStruct(lista);

        for (let i = 0; i < this.cuerpoCatch.length; i++) {
            if (this.cuerpoCatch[i] instanceof InstruccionJ) {
                (<InstruccionJ>this.cuerpoCatch[i]).RecolectarStruct(lista);
            }
        }

    }

    public DeterminarTamanioFuncion(funcion: DecFun): void {
        super.DeterminarTamanioFuncion(funcion);
        for (let i = 0; i < this.cuerpoCatch.length; i++) {
            if (this.cuerpoCatch[i] instanceof InstruccionJ) {
                (<InstruccionJ>this.cuerpoCatch[i]).DeterminarTamanioFuncion(funcion);
            }
        }
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('TRYCATCH');
        conectarNodo(padre, n);
        let tr: string = getIdNodo('TRY');
        conectarNodo(n, tr);
        this.DibujarCuerpo(tr);
        let c: string = getIdNodo('CATCH');
        conectarNodo(n, c);
        let l_error: string = getIdNodo('L_ERROR');
        conectarNodo(c, l_error);
        this.parametrosCatch.forEach(param => {
            conectarNodo(l_error, getIdNodo(param.nombre + ':' + param.tipoDato.getString()));
        });
        let sent: string = getIdNodo('L_SENT');
        conectarNodo(c, sent);
        this.cuerpoCatch.forEach(nodo => {
            nodo.dibujar(sent);
        });
    }

}
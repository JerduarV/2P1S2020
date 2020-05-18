import * as parser from 'src/Gramatica/Gramatica3D';
import { DecFuncion } from './Instruccion/DecFuncion';
import { NodoAST } from './AST/NodoAST';
import { InitFun } from './Instruccion/InitFun';
import { EndFun } from './Instruccion/EndFun';
import { Instruccion } from './Instruccion/Instruccion';
import { reporte_optimi, InsertReporte } from '../Auxiliares/Utilidades';
import { SaltoCond } from './Instruccion/SaltoCond';
import { Operacion, TipoOpe } from './Expresion/Operacion';
import { Literal } from './Expresion/Literal';
import { SaltoIC } from './Instruccion/SaltoIC';
import { Direccion } from './Instruccion/Direccion';
import { Bloque, dot_bloque, ConstruirDot } from './Bloque';

export class Optimizador {

    constructor() { }

    public Optimizar(codigo: string): string {
        try {

            let AST;
            //PARSEO
            AST = parser.parse(codigo);
            AST = this.Linealizar(AST);
            this.ConstruirBloquesInicio(AST);
            reporte_optimi.splice(0, reporte_optimi.length);
            this.OptimizarMirill(AST);

            return this.Reescribir(AST);

        } catch (error) {
            console.log(error);
        }
    }

    private OptimizarMirill(AST: NodoAST[]): void {

        for (let i = 0; i < AST.length; i++) {
            const nodo = AST[i];
            if (nodo instanceof Instruccion) {
                nodo.OpimizarR818();
                if (nodo instanceof SaltoCond) {
                    this.OptimizarRegla5(nodo);
                }

                if (nodo instanceof SaltoCond) {
                    if (i + 1 < AST.length) {
                        if (AST[i + 1] instanceof SaltoIC) {
                            this.OptimizarRegla4(nodo, <SaltoIC>AST[i + 1]);
                        }
                    }
                }

                if (nodo instanceof SaltoIC) {
                    this.OptimizarRegla2(i, AST, nodo);
                }

            }

        }
    }

    private OptimizarRegla2(index: number, AST: NodoAST[], saltoic: SaltoIC): void {
        let i: number = this.BuscarEtiqueta(index + 1, AST, saltoic.label);
        if (i == -1) {
            return;
        }

        if (this.ExistenEtiquetas(index + 1, i, AST)) {
            return;
        }

        for (let y = index; y < i && y < AST.length; y++) {
            const element = AST[y];
            if (element instanceof Instruccion) {
                element.DebeEscribirse = false;
                InsertReporte('Línea eliminada: ' + element.Escribir(), 2, element.getFila().toString());
            }
        }

    }

    private BuscarEtiqueta(index: number, AST: NodoAST[], label: string): number {
        for (let y = index; y < AST.length; y++) {
            const nodo = AST[y];
            if (nodo instanceof Direccion) {
                if (nodo.getID() == label) {
                    return y;
                }
            }
        }
        return -1;
    }

    private ExistenEtiquetas(inicio: number, final: number, AST: NodoAST[]): boolean {
        for (let i = inicio; i < final && i < AST.length; i++) {
            const element = AST[i];
            if (element instanceof Direccion) {
                return true;
            }
        }
        return false;
    }

    private OptimizarRegla4(saltoc: SaltoCond, saltoic: SaltoIC): void {
        let cond: Operacion = <Operacion>saltoc.cond;
        if (cond.tipo == TipoOpe.IGUALQUE) {
            if (cond.ExpDer instanceof Literal && cond.ExpIzq instanceof Literal && cond.ExpDer.getCadena() == cond.ExpIzq.getCadena()) {
                saltoc.DebeEscribirse = false;
                saltoic.label = saltoc.lb;
                InsertReporte('Línea eliminada: ' + saltoc.Escribir(), 4, saltoc.getFila().toString());
            }
        } else if (cond.tipo == TipoOpe.DIFERENTE) {
            if (cond.ExpDer instanceof Literal && cond.ExpIzq instanceof Literal && cond.ExpDer.getCadena() != cond.ExpIzq.getCadena()) {
                saltoc.DebeEscribirse = false;
                saltoic.label = saltoc.lb;
                InsertReporte('Línea eliminada: ' + saltoc.Escribir(), 4, saltoc.getFila().toString());
            }
        }
    }

    private OptimizarRegla5(salto: SaltoCond): void {
        let cond: Operacion = <Operacion>salto.cond;
        if (cond.tipo == TipoOpe.IGUALQUE) {
            if (cond.ExpDer instanceof Literal && cond.ExpIzq instanceof Literal && cond.ExpDer.getCadena() != cond.ExpIzq.getCadena()) {
                salto.DebeEscribirse = false;
                InsertReporte('Línea eliminada: ' + salto.Escribir(), 5, salto.getFila().toString());
            }
        } else if (cond.tipo == TipoOpe.DIFERENTE) {
            if (cond.ExpDer instanceof Literal && cond.ExpIzq instanceof Literal && cond.ExpDer.getCadena() == cond.ExpIzq.getCadena()) {
                salto.DebeEscribirse = false;
                InsertReporte('Línea eliminada: ' + salto.Escribir(), 5, salto.getFila().toString());
            }
        }
    }

    /**
     * Función que convierte el árbol en un arreglo lineal
     * @param AST Arbol a linealizar
     */
    private Linealizar(AST: []): NodoAST[] {
        let AST_nuevo: NodoAST[] = [];
        for (let i = 0; i < AST.length; i++) {
            let nodo: NodoAST = AST[i];
            //SI EL NODO ES UN FUNCIÓN LINEALIZO SU CUERPO
            if (nodo instanceof DecFuncion) {
                let init: InitFun = new InitFun(nodo.getID(), nodo.getFila(), nodo.getCol());
                AST_nuevo.push(init);
                nodo.getCuerpo().forEach(inst => {
                    AST_nuevo.push(inst);
                });
                AST_nuevo.push(new EndFun(nodo.getFila(), nodo.getCol()));
            } else {
                AST_nuevo.push(nodo);
            }
        }
        return AST_nuevo;
    }

    private Reescribir(AST: NodoAST[]): string {
        let cad: string = '';
        AST.forEach(nodo => {
            if (nodo instanceof Instruccion) {
                if (nodo.debeEscribirse()) {
                    cad += nodo.Escribir();
                }
            }
        });
        return cad;
    }

    public ConstruirBloquesInicio(AST: NodoAST[]) {

        let bloques_basicos: Bloque[] = [];
        let bloque_act: Bloque = new Bloque();
        bloques_basicos.push(bloque_act);

        for (let i = 0; i < AST.length; i++) {
            const element = AST[i];
            if (element instanceof Direccion) {
                if (bloque_act.lista_inst.length > 0) {
                    let bloque_nuevo: Bloque = new Bloque();
                    bloque_nuevo.id = element.getID();
                    bloque_nuevo.lista_inst.push(element);
                    bloque_act.hijos.push(bloque_nuevo);
                    bloque_act = bloque_nuevo;
                    bloques_basicos.push(bloque_nuevo);
                }else{
                    bloque_act.id = element.getID();
                    bloque_act.lista_inst.push(element);
                }

            } else if (element instanceof SaltoIC) {
                bloque_act.lista_inst.push(element);
                let bloque_nuevo: Bloque = new Bloque;
                bloques_basicos.push(bloque_nuevo);
                bloque_act.conexiones.push(element.label);
                bloque_act = bloque_nuevo;
            } else if (element instanceof SaltoCond) {
                bloque_act.lista_inst.push(element);
                let bloque_nuevo: Bloque = new Bloque;
                bloques_basicos.push(bloque_nuevo);
                bloque_act.conexiones.push(element.lb);
                bloque_act.hijos.push(bloque_nuevo);
                bloque_act = bloque_nuevo;
            } else {
                bloque_act.lista_inst.push(<Instruccion>element);
            }
        }

        //console.log(bloques_basicos);
        ConstruirDot(bloques_basicos);
        //console.log(dot_bloque);
    }



}
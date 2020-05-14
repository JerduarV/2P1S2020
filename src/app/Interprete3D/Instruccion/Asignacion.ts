import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Operacion, TipoOpe } from '../Expresion/Operacion';
import { InsertReporte } from 'src/app/Auxiliares/Utilidades';

export class Asignacion extends Instruccion {

    /**
     * Id de la variable a asignar
     */
    private readonly id: string;

    /**
     * Expresión que se asignará
     */
    private exp: Expresion;

    /**
     * Constructor de la Instrucción Asignación de la forma id = exp
     * @param id Identificador de la variable a modificar
     * @param e Expresión que se asignará
     * @param fila Fila en la que se encuentra
     * @param col Columna en la que se encuentra
     */
    constructor(id: string, e: Expresion, fila: number, col: number) {
        super(fila, col);
        this.id = id;
        this.exp = e;
    }

    public Escribir(): string {
        return this.id + ' = ' + this.exp.getCadena() + ';\n';
    }

    public OpimizarR818(): void {
        if (this.exp instanceof Operacion) {
            //REGLA 8 Y 9: x = x + 0 || x = x - 0 -> ELIMINACIÓN
            if (this.exp.tipo == TipoOpe.SUMA || this.exp.tipo == TipoOpe.RESTA) {
                if (this.exp.ExpIzq.getCadena() == this.id && this.exp.ExpDer.getCadena() == '0') {
                    this.DebeEscribirse = false;
                    InsertReporte('Linea Eliminada: ' + this.Escribir(), this.exp.tipo == TipoOpe.SUMA ? 8 : 9, this.getFila().toString());
                }
                //REGLA 12 Y 13: x = y + 0 || x = y - 0  -> x = y
                else if (this.exp.ExpDer.getCadena() == '0') {
                    InsertReporte('Linea Modificada: ' + this.Escribir(), this.exp.tipo == TipoOpe.SUMA ? 12 : 13, this.getFila().toString());
                    this.exp = this.exp.ExpIzq;
                }
            }
            //REGLA 10: x = x * 1 || x = x / 1 -> ELIMINACIÓN
            else if (this.exp.tipo == TipoOpe.MULT || this.exp.tipo == TipoOpe.DIV) {
                if (this.exp.ExpIzq.getCadena() == this.id && this.exp.ExpDer.getCadena() == '1') {
                    this.DebeEscribirse = false;
                    InsertReporte('Linea Eliminada: ' + this.Escribir(), this.exp.tipo == TipoOpe.MULT ? 10 : 11, this.getFila().toString());
                }
                //REGLA 14 y 15: x = y * 1 || x = y / 1 ->  x = y
                else if (this.exp.ExpDer.getCadena() == '1') {
                    InsertReporte('Linea Modificada: ' + this.Escribir(), this.exp.tipo == TipoOpe.MULT ? 14 : 15, this.getFila().toString());
                    this.exp = this.exp.ExpIzq;
                }
                //REGLA 16: x = y * 2 -> x = y + y
                else if (this.exp.tipo == TipoOpe.MULT && this.exp.ExpDer.getCadena() == '2') {
                    InsertReporte('Linea Modificada: ' + this.Escribir(), 16, this.getFila().toString());
                    this.exp = new Operacion(TipoOpe.SUMA, this.exp.ExpIzq, this.exp.ExpIzq, this.exp.getFila(), this.exp.getCol());
                }//REGLA 17: x = y * 0 -> x = 0
                else if (this.exp.tipo == TipoOpe.MULT && this.exp.ExpDer.getCadena() == '0') {
                    InsertReporte('Linea Modificada: ' + this.Escribir(), 17, this.getFila().toString());
                    this.exp = this.exp.ExpDer;
                }
                //REGLA 18: x = y * 2 -> x = y + y
                else if (this.exp.tipo == TipoOpe.DIV && this.exp.ExpIzq.getCadena() == '0') {
                    InsertReporte('Linea Modificada: ' + this.Escribir(), 18, this.getFila().toString());
                    this.exp = this.exp.ExpIzq;
                }

                
            }
        }
    }

}
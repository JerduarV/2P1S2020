import { Component, OnInit, ViewChild } from '@angular/core';
import { Consola } from 'src/app/Auxiliares/Consola';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { VentanaErroresComponent } from '../ventana-errores/ventana-errores.component';
import { Interprete3D } from 'src/app/Interprete3D/Interprete3D';
import { CompiladorJ } from 'src/app/Compilador/CompiladorJ';
import { EditorAvanzadoComponent } from '../editor-avanzado/editor-avanzado.component';
import { Editor3Component } from '../editor3/editor3.component';
import { lista_funciones_global } from 'src/app/Compilador/TSJ/SimbFuncion';
import { lista_var_global, lista_strc_global } from 'src/app/Compilador/TSJ/TablaSimbJ';
import { graphviz } from 'd3-graphviz';
import { dot, lista_errores } from 'src/app/Auxiliares/Utilidades';
import { Optimizador } from 'src/app/Interprete3D/Optimizador';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild('editor') private editor_avanzado: EditorAvanzadoComponent;

  private consola: Consola = new Consola();
  public editorOptions: any = { theme: 'vs-dark', language: 'java' };

  //FUNCIONES
  funciones = new MatTableDataSource(lista_funciones_global);
  displayedColumns: string[] = ['NOMBRE', 'TIPO RETORNO', 'TAMAÑO', 'PARAMETROS'];

  //VARIABLES
  variables = new MatTableDataSource(lista_var_global);
  dC: string[] = ['NOMBRE', 'TIPO', 'POSICIÓN', 'GLOBAL/LOCAL', 'CONSTANTE']

  //VARIABLES
  structs = new MatTableDataSource(lista_strc_global);
  dC2: string[] = ['NOMBRE', 'TAMAÑO', 'ATRIBUTOS'];

  workspace: any

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.consola.salida = '#* TODO CODE HERE *#'
  }

  /**
   * Método por el que se envía el paquete Query para ser
   * ejecutado del lado del servidor
   */
  public Ejecutar(): void {
    this.LimpiarConsola();

    let interprete: Interprete3D = new Interprete3D();
    interprete.Analizar(this.editor_avanzado.get3D())
  }

  public Optimizar(): void {
    let optimi: Optimizador = new Optimizador();
    optimi.Optimizar(this.consola.salida);
  }

  public DibujarAST(): void {
    try {
      graphviz('div2').renderDot(dot);
      //console.log(dot);
    } catch (error) {
      console.log(error);
      console.log(dot);
    }

  }

  /**
   * Método que compila el código que se debe compilar
   */
  public Compilar(): void {
    let compilador: CompiladorJ = new CompiladorJ();
    this.consola.lista_errores = [];
    let archivos: Editor3Component[] = this.editor_avanzado.getTabs();
    //console.log(archivos);
    //console.log(this.editor_avanzado.getTexto());
    compilador.Compilar(this.editor_avanzado.getNombre(), this.editor_avanzado.getTexto(), this.consola, archivos);
    //console.log(this.funciones);
  }

  /**
   * Limpia la consola de salida
   */
  private LimpiarConsola(): void {
    this.consola.salida = "//SALIDA";
    this.consola.lista_select = [];
    this.consola.lista_errores = [];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VentanaErroresComponent, {
      width: '750px',
      data: { lista: lista_errores, nombre: "jerson" }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.funciones.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.variables.filter = filterValue.trim().toLowerCase();
  }


  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.structs.filter = filterValue.trim().toLowerCase();
  }

}



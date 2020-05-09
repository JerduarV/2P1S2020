import { Component, OnInit, ViewChild } from '@angular/core';
import { Consola } from 'src/app/Auxiliares/Consola';
import { MatDialog } from '@angular/material';
import { VentanaErroresComponent } from '../ventana-errores/ventana-errores.component';
import { Interprete3D } from 'src/app/Interprete3D/Interprete3D';
import { CompiladorJ } from 'src/app/Compilador/CompiladorJ';
import { EditorAvanzadoComponent } from '../editor-avanzado/editor-avanzado.component';
import { Editor3Component } from '../editor3/editor3.component';

declare var parsear: any;
declare var InterpretarLup: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild('editor') private editor_avanzado: EditorAvanzadoComponent;

  private consola: Consola = new Consola();
  public editorOptions: any = {theme: 'vs-dark', language: 'java'};


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

  /**
   * Método que compila el código que se debe compilar
   */
  public Compilar(): void {
    let compilador: CompiladorJ = new CompiladorJ();
    this.consola.lista_errores = [];
    let archivos: Editor3Component[] = this.editor_avanzado.getTabs();
    console.log(archivos);
    compilador.Compilar(this.editor_avanzado.getNombre(), this.editor_avanzado.getTexto(),this.consola,archivos);
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
      data: { lista: this.consola.lista_errores, nombre: "jerson" }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

}



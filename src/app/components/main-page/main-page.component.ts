import { Component, OnInit, ViewChild } from '@angular/core';
import { Consola } from 'src/app/Auxiliares/Consola';
import {MatDialog } from '@angular/material';
import { VentanaErroresComponent } from '../ventana-errores/ventana-errores.component';
import { Interprete3D } from 'src/app/Interprete3D/Interprete3D';

declare var parsear: any;
declare var InterpretarLup: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild('editor') private editor_avanzado: any;

  private consola: Consola = new Consola();
  private nivel: string;
  private sub: any;
  private lup: string = "";


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    
  }

  /**
   * Método por el que se envía el paquete Query para ser
   * ejecutado del lado del servidor
   */
  public Ejecutar(): void{
    this.LimpiarConsola();
    
    let interprete: Interprete3D = new Interprete3D();
    interprete.Analizar(this.editor_avanzado.get3D())
  }

  /**
   * Limpia la consola de salida
   */
  private LimpiarConsola():void{
    this.consola.salida = "//SALIDA";
    this.consola.lista_select = [];
    this.consola.lista_errores = [];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VentanaErroresComponent,{
      width: '750px',
      data: {lista: this.consola.lista_errores, nombre: "jerson"}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

}



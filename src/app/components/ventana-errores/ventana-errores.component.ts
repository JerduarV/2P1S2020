import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ErrorLup } from 'src/app/Auxiliares/Error';

export interface DialogData {
  lista: ErrorLup[];
  nombre: string
}

@Component({
  selector: 'app-ventana-errores',
  templateUrl: './ventana-errores.component.html',
  styleUrls: ['./ventana-errores.component.css']
})
export class VentanaErroresComponent{

  displayedColumns: string[] = ['TIPO', 'DESCRIPCION', 'FILA', 'COLUMNA'];

  constructor(
    public dialogRef: MatDialogRef<VentanaErroresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

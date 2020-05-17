import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor3',
  templateUrl: './editor3.component.html',
  styleUrls: ['./editor3.component.css']
})
export class Editor3Component implements OnInit {

  public editorOptions: any = { theme: 'vs-dark', language: 'java', caseSensitive: true };
  public code: string = '//TODO CODE HERE';
  public nombre: string;

  onInit(editor) {
    let line = editor.getPosition();
    console.log(line);
  }

  constructor() {
    this.nombre = 'Nuevo.cql';
  }

  public getSelectedText(): any {
    return ((<any>window).monaco).editor.getModels()[0].getValueInRange();
  }

  ngOnInit() {
  }

  public getCod(): string {
    return this.code;
  }

  public setCod(cod: string): void {
    this.code = cod;
  }

  public setNombre(n: string): void {
    this.nombre = n;
  }

  public getNombre(): string {
    return this.nombre;
  }
}

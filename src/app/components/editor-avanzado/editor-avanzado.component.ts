import { Component, OnInit, ViewChildren } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Editor3Component } from '../editor3/editor3.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editor-avanzado',
  templateUrl: './editor-avanzado.component.html',
  styleUrls: ['./editor-avanzado.component.css']
})
export class EditorAvanzadoComponent implements OnInit {

  @ViewChildren("editor") editor: any;

  private ArregloTabs: Editor3Component[];
  private selectedTab: Editor3Component = null;
  private indexSelectedTab: number;
  public codigo3d: Editor3Component = new Editor3Component();
  fileUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.ArregloTabs = [];
  }

  private addTab(): void {
    let tab: Editor3Component = new Editor3Component();
    tab.setNombre('nuevo.j');
    tab.setCod('//TODO CODE HERE');
    this.codigo3d.code = '//CODIGO 3D'
    this.ArregloTabs.push(tab);
  }

  /**
   * Método para guardar archivo al editor
   * @param event Importar archivo al editor
   */
  importFile(event) {

    if (event.target.files.length == 0) {
      console.log("No file selected!");
      return
    }

    for (let i = 0; i < event.target.files.length; i++) {
      let file: File = event.target.files[i];

      // after here 'file' can be accessed and used for further process
      let fileReader: FileReader = new FileReader();
      fileReader.onload = (e) => {
        this.AddTab(file.name, fileReader.result as string);
        //console.log(fileReader.result as string);
      }
      fileReader.readAsText(file);
    }


  }

  exportFile() {
    if (this.selectedTab == null) {
      return;
    }
    let data = this.getTexto();
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  ngOnInit() {

  }

  public AddTab(nombreTab: string, contenido: string): Editor3Component {
    let tab: Editor3Component = new Editor3Component();
    this.ArregloTabs.push(tab);
    tab.setNombre(nombreTab);
    tab.setCod(contenido);
    return tab;
  }

  public RemoveTab(): void {
    if (this.indexSelectedTab) {
      this.ArregloTabs.splice(this.indexSelectedTab);
    }
  }

  public getTab(): void {
    if (this.selectedTab) {
      console.log(this.selectedTab.getCod() + ' ' + this.selectedTab.getNombre());
    }
  }

  public onInitEditor($event: any) {
    // See the editor component
    console.log($event);
  }

  /**
   * Retorna la tab seleccionada actualmente
   * @param tabChagedEvent 
   */
  private tabChanged(tabChagedEvent: MatTabChangeEvent): void {
    this.selectedTab = this.ArregloTabs[tabChagedEvent.index];
    this.indexSelectedTab = tabChagedEvent.index;
  }

  public getSelectedText(): string {
    console.log(this.selectedTab.getSelectedText());
    return '';
  }

  public getTexto(): string {
    if (this.selectedTab != null) {
      return this.selectedTab.getCod();
    } else {
      return '//NO HABÍA CODIGO';
    }
  }

  public getNombre(): string {
    return this.selectedTab.getNombre();
  }

  public get3D(): string {
    return this.codigo3d.code;
  }

}

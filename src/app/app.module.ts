import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { EditorAvanzadoComponent } from './components/editor-avanzado/editor-avanzado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule, MatButtonModule, MatIconModule, MatDialogModule, MatTableModule } from '@angular/material';
import { Editor3Component } from './components/editor3/editor3.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { VentanaErroresComponent } from './components/ventana-errores/ventana-errores.component';

export const monacoConfig:  NgxMonacoEditorConfig = {

  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad: () => {
    
    monaco.editor.defineTheme('CAAS', {
      base: 'vs', // can also be vs-dark or hc-black
      inherit: true, // can also be false to completely replace the builtin rules
      rules: [
        {token : 'string', foreground : '#f48f42'},
        {token : 'comment', foreground : '#818791'},
        {token : 'number.float', foreground : '#bf59ff'},
        {token : 'number', foreground : '#bf59ff'}
      ],
      colors: {
        
      }
    });

  }
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EditorAvanzadoComponent,
    Editor3Component,
    VentanaErroresComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA],
  entryComponents: [VentanaErroresComponent]
})
export class AppModule { }

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorAvanzadoComponent } from './editor-avanzado.component';

describe('EditorAvanzadoComponent', () => {
  let component: EditorAvanzadoComponent;
  let fixture: ComponentFixture<EditorAvanzadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorAvanzadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorAvanzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

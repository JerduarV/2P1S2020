import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaErroresComponent } from './ventana-errores.component';

describe('VentanaErroresComponent', () => {
  let component: VentanaErroresComponent;
  let fixture: ComponentFixture<VentanaErroresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentanaErroresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

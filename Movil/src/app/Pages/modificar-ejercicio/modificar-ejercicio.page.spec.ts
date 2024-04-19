import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarEjercicioPage } from './modificar-ejercicio.page';

describe('ModificarEjercicioPage', () => {
  let component: ModificarEjercicioPage;
  let fixture: ComponentFixture<ModificarEjercicioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarEjercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

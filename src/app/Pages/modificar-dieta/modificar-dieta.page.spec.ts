import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarDietaPage } from './modificar-dieta.page';

describe('ModificarDietaPage', () => {
  let component: ModificarDietaPage;
  let fixture: ComponentFixture<ModificarDietaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarDietaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

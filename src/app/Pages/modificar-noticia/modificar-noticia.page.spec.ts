import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarNoticiaPage } from './modificar-noticia.page';

describe('ModificarNoticiaPage', () => {
  let component: ModificarNoticiaPage;
  let fixture: ComponentFixture<ModificarNoticiaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarNoticiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

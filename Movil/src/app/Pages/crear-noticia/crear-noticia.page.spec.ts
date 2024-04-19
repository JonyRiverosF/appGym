import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearNoticiaPage } from './crear-noticia.page';

describe('CrearNoticiaPage', () => {
  let component: CrearNoticiaPage;
  let fixture: ComponentFixture<CrearNoticiaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearNoticiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

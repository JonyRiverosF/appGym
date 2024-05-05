import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarRegistroPage } from './confirmar-registro.page';

describe('ConfirmarRegistroPage', () => {
  let component: ConfirmarRegistroPage;
  let fixture: ComponentFixture<ConfirmarRegistroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmarRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

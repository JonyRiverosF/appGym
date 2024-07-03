import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagarMesPage } from './pagar-mes.page';

describe('PagarMesPage', () => {
  let component: PagarMesPage;
  let fixture: ComponentFixture<PagarMesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagarMesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoListoPage } from './pago-listo.page';

describe('PagoListoPage', () => {
  let component: PagoListoPage;
  let fixture: ComponentFixture<PagoListoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagoListoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

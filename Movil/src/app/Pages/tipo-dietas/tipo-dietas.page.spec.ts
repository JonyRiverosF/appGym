import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoDietasPage } from './tipo-dietas.page';

describe('TipoDietasPage', () => {
  let component: TipoDietasPage;
  let fixture: ComponentFixture<TipoDietasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TipoDietasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

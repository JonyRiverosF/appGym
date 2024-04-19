import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModiDietasPage } from './modi-dietas.page';

describe('ModiDietasPage', () => {
  let component: ModiDietasPage;
  let fixture: ComponentFixture<ModiDietasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModiDietasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

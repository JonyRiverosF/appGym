import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusculosPage } from './musculos.page';

describe('MusculosPage', () => {
  let component: MusculosPage;
  let fixture: ComponentFixture<MusculosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MusculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

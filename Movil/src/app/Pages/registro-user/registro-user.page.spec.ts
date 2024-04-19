import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroUserPage } from './registro-user.page';

describe('RegistroUserPage', () => {
  let component: RegistroUserPage;
  let fixture: ComponentFixture<RegistroUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { UserSignUpPage } from './user-sign-up.page';

describe('UserSignUpPage', () => {
  let component: UserSignUpPage;
  let fixture: ComponentFixture<UserSignUpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

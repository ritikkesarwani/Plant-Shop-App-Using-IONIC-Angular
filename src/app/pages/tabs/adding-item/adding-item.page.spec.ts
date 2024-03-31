import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddingItemPage } from './adding-item.page';

describe('AddingItemPage', () => {
  let component: AddingItemPage;
  let fixture: ComponentFixture<AddingItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddingItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

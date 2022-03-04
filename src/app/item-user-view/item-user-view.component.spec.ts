import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUserViewComponent } from './item-user-view.component';

describe('ItemUserViewComponent', () => {
  let component: ItemUserViewComponent;
  let fixture: ComponentFixture<ItemUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

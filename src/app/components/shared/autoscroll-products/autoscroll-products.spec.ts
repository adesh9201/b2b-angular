import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoscrollProducts } from './autoscroll-products';

describe('AutoscrollProducts', () => {
  let component: AutoscrollProducts;
  let fixture: ComponentFixture<AutoscrollProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoscrollProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoscrollProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

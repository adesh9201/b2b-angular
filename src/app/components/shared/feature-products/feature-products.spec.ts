import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureProducts } from './feature-products';

describe('FeatureProducts', () => {
  let component: FeatureProducts;
  let fixture: ComponentFixture<FeatureProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

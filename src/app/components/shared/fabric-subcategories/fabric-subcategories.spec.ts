import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricSubcategories } from './fabric-subcategories';

describe('FabricSubcategories', () => {
  let component: FabricSubcategories;
  let fixture: ComponentFixture<FabricSubcategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabricSubcategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricSubcategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

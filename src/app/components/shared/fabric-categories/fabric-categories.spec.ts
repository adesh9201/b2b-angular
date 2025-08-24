import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricCategories } from './fabric-categories';

describe('FabricCategories', () => {
  let component: FabricCategories;
  let fixture: ComponentFixture<FabricCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabricCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

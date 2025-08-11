import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoscrollCategory } from './autoscroll-category';

describe('AutoscrollCategory', () => {
  let component: AutoscrollCategory;
  let fixture: ComponentFixture<AutoscrollCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoscrollCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoscrollCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

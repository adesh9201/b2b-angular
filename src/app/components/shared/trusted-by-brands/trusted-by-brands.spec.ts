import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedByBrands } from './trusted-by-brands';

describe('TrustedByBrands', () => {
  let component: TrustedByBrands;
  let fixture: ComponentFixture<TrustedByBrands>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustedByBrands]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustedByBrands);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

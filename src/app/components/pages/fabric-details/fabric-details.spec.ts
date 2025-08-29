import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricDetails } from './fabric-details';

describe('FabricDetails', () => {
  let component: FabricDetails;
  let fixture: ComponentFixture<FabricDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabricDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

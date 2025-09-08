import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricAdmin } from './fabric-admin';

describe('About', () => {
  let component: FabricAdmin;
  let fixture: ComponentFixture<FabricAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabricAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

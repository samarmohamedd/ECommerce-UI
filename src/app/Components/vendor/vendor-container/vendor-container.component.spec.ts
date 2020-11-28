import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorContainerComponent } from './vendor-container.component';

describe('VendorContainerComponent', () => {
  let component: VendorContainerComponent;
  let fixture: ComponentFixture<VendorContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

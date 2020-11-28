import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockItemsContainerComponent } from './stock-items-container.component';

describe('StockItemsContainerComponent', () => {
  let component: StockItemsContainerComponent;
  let fixture: ComponentFixture<StockItemsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockItemsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockItemsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

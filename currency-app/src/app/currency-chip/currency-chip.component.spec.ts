import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyChipComponent } from './currency-chip.component';

describe('CurrencyChipComponent', () => {
  let component: CurrencyChipComponent;
  let fixture: ComponentFixture<CurrencyChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

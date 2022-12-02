import {Component, Input, OnInit} from '@angular/core';
import {UnsubscribeSubjectService} from "../common/unsubscribe.servise";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, finalize, merge, takeUntil} from "rxjs";
import {CurrencyService} from "../services/currency.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-input-converter',
  templateUrl: './input-converter.component.html',
  styleUrls: ['./input-converter.component.scss'],
  providers: [UnsubscribeSubjectService]
})
export class InputConverterComponent implements OnInit {
  @Input() baseCurrency!: string;
  @Input() changeCurrency!: string;
  converter = new FormGroup({
    baseCurrency: new FormControl(),
    baseCurrencyInput: new FormControl(),
    changeCurrency: new FormControl(),
    changeCurrencyInput: new FormControl(),
  })

  baseToChangePrice: number = 0;
  changeToBasePrice: number = 0;

  baseCurrencyInputActive: boolean = false;
  baseCurrencyActive: boolean = false;
  changeCurrencyInputActive: boolean = false;
  changeCurrencyActive: boolean = false;


  constructor(
    public spinner: NgxSpinnerService,
    private currencyService: CurrencyService,
    private unsubscribe$: UnsubscribeSubjectService
  ) {
  }

  ngOnInit(): void {
    this.converter.patchValue({
      baseCurrency: this.baseCurrency,
      changeCurrency: this.changeCurrency
    })
    this.getCurrenciesPrice(this.baseCurrency,this.changeCurrency);
    this.inputsSubscribes();
    this.currencySubscribes();
  }

  currencySubscribes() {
    merge(
      this.converter.get('baseCurrency')!.valueChanges,
      this.converter.get('changeCurrency')!.valueChanges
    ).pipe(
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      console.log(value);
      if(value){
        if(this.baseCurrencyActive){
          this.getCurrenciesPrice(value,this.converter.value.changeCurrency!)
        }
        if(this.changeCurrencyActive){
          this.getCurrenciesPrice(this.converter.value.baseCurrency!, value)
        }
      }
    })
  }

  inputsSubscribes(){
    merge(
      this.converter.get('changeCurrencyInput')!.valueChanges,
      this.converter.get('baseCurrencyInput')!.valueChanges
    ).pipe(
      distinctUntilChanged(),
      debounceTime(500),
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      if(value){
        if(this.baseCurrencyInputActive){
          this.calculateChangeInputValue(value)
        }
        if(this.changeCurrencyInputActive){
          this.calculateBaseInputValue(value)
        }
      }
    })
  }

  calculateChangeInputValue(baseValue: number) {
    if (baseValue) {
      this.converter.patchValue({
        changeCurrencyInput: Math.round(baseValue * this.baseToChangePrice * 100) / 100
      }, {emitEvent: false})
    }
    this.clearActive()
  }

  calculateBaseInputValue(changeValue: number) {
    if (changeValue) {
      this.converter.patchValue({
        baseCurrencyInput: Math.round(changeValue * this.changeToBasePrice * 100) / 100
      }, {emitEvent: false})
    }
    this.clearActive()
  }

  clearActive(){
    this.baseCurrencyInputActive = false;
    this.baseCurrencyActive = false;
    this.changeCurrencyInputActive = false;
    this.changeCurrencyActive = false;
  }

  getCurrenciesPrice(base: string, change: string) {
    const pair = `${base}_${change},${change}_${base}`;
    this.spinner.show();
    this.currencyService.getCurrencyPair(pair).pipe(
      finalize(() => this.spinner.hide()),
      takeUntil(this.unsubscribe$)
    ).subscribe((data: any) => {
      this.baseToChangePrice = data[`${base}_${change}`];
      this.changeToBasePrice = data[`${change}_${base}`];
      if(this.converter.value.baseCurrencyInput){
        this.calculateChangeInputValue(this.converter.value.baseCurrencyInput)
      }
    })
  }

}

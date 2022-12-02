import {Component, Input, OnInit} from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize, takeUntil} from "rxjs";
import {UnsubscribeSubjectService} from "../common/unsubscribe.servise";

type Currency = {
  [key: string]: number
}

@Component({
  selector: 'app-currency-chip',
  templateUrl: './currency-chip.component.html',
  styleUrls: ['./currency-chip.component.scss'],
  providers: [UnsubscribeSubjectService]
})

export class CurrencyChipComponent implements OnInit {
  @Input() currency!: string;
  price: number = 0;
  constructor(
    public spinner: NgxSpinnerService,
    private unsubscribe$: UnsubscribeSubjectService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.currencyService.getCurrency(this.currency).pipe(
      finalize(() => this.spinner.hide()),
      takeUntil(this.unsubscribe$)
    ).subscribe(data =>{
        this.price = (data as Currency)[this.currency + '_UAH']
    });
  }

}

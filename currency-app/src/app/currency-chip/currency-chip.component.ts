import {Component, Input, OnInit} from '@angular/core';
import {CurrencyService} from "../services/currency.service";

type Currency = {
  [key: string]: number
}

@Component({
  selector: 'app-currency-chip',
  templateUrl: './currency-chip.component.html',
  styleUrls: ['./currency-chip.component.scss']
})

export class CurrencyChipComponent implements OnInit {
  @Input() currency!: string;
  price: number = 0;
  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getCurrency(this.currency).subscribe(data =>{
        this.price = (data as Currency)[this.currency + '_UAH']
    });
  }

}

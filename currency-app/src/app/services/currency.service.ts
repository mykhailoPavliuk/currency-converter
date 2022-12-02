import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {


  constructor(private http:HttpClient ) { }
  // https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=3e03c605f737ae46cddb
  private CURRENCY_API = 'https://free.currconv.com/api/v7/convert';



  getCurrency(currency:string) {
    return this.http.jsonp(`${this.CURRENCY_API}?q=${currency + '_UAH'}&compact=ultra&apiKey=3e03c605f737ae46cddb`, 'callback');
  }

  getCurrencyToUAHList() {
    return this.http.jsonp(`${this.CURRENCY_API}?q=USD_UAH,EUR_UAH&compact=ultra&apiKey=3e03c605f737ae46cddb`, 'callback');
  }

  getCurrencyPair(pair:string) {
    return this.http.jsonp(`${this.CURRENCY_API}?q=${pair}&compact=ultra&apiKey=3e03c605f737ae46cddb`, 'callback');
  }
}

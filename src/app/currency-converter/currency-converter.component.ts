import { Component, OnInit } from '@angular/core';
import { Currency } from '../../server/models/currencymodel';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  public currencydata: Currency;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getAllData('currencies').subscribe(
      data => this.currencydata = data,
      err => console.log(err),
      () => console.log('completed')
    );
  }

  addCurrency() {
    // this.apiService.addData('currencies', currency);
    console.log('currency has been added');
  }
}

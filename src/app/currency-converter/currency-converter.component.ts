import { Component, OnInit } from '@angular/core';
import { Currency } from '../../server/models/currencymodel';
import { ApiService } from '../api.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  public currencydata: Currency;

  country: string;
  exchangeRate: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.apiService.getAllData('currencies').subscribe(
      data => {
        this.currencydata = data;
        console.log('refreshed data::', data);
      },
      err => console.log(err),
      () => console.log('completed')
    );
  }

  addCurrency() {
    if (this.country && this.exchangeRate) {
      console.log('currency:', this.country, this.exchangeRate);
      const currency = {
        'country': this.country,
        'exchangerate': this.exchangeRate,
        'createdAt': moment(new Date()),
        'updatedAt': moment(new Date())
      };
      this.apiService.addData('currencies', currency).subscribe(
        data => {
          console.log('updated data::', data);
          this.apiService.getAllData('currencies').subscribe(
            currData => {
              this.currencydata = currData;
            },
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
    } else {
      console.warn('country and exchange rate must be specified!');
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {
  }

  getAllData(apiItem: String): any {
    return this.http.get(this.baseURL + apiItem, { responseType: 'json' });
  }

  addData(apiItem: String, currency: any): any {
    console.log('...adding data', currency);
    const params = new HttpParams().set('currency', 'dollars');
    params.append('currency', currency);
    return this.http.post(this.baseURL + apiItem, currency);
    // return this.http.post(this.baseURL + apiItem, {params});
    // return this.http.get(this.baseURL + apiItem + '/1');
  }
}

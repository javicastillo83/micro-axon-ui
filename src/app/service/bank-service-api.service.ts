import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankService } from '../model/bankservice';

@Injectable({
  providedIn: 'root'
})
export class BankServiceApiService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<BankService[]> {
    return this.http.get<BankService[]>('http://pc064:8080/bankservices');
  }

  create(dataItem: BankService) {
    return this.http.post('http://pc064:8080/bankservices', dataItem, {
      responseType: 'text'
    });
  }

  update(dataItem: BankService) {
    return this.http.put('http://pc064:8080/bankservices/' + dataItem.id, dataItem, {
      responseType: 'text'
    });
  }

  remove(dataItem: BankService) {
    return this.http.delete('http://pc064:8080/bankservices/' + dataItem.id,  {
      responseType: 'text'
    });
  }
}

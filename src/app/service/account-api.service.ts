import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Account[]> {
    return this.http.get<Account[]>('http://pc064:8080/accounts');
  }


}

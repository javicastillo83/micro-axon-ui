import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { BankService } from '../model/bankservice';
import { BankServiceApiService } from '../service/bank-service-api.service';

@Injectable({
  providedIn: 'root'
})
export class BankServiceEditService extends BehaviorSubject<any[]> {

  constructor(private bankServiceApi: BankServiceApiService) {
    super([]);
  }

  private data: BankService[] = [];

  public read() {
    if (this.data.length) {
      return super.next(this.data);
    }

    this.fetch()
        .pipe(
          tap(data => {
            this.data = data;
          })
        )
        .subscribe(data => {
          super.next(data);
        });
  }

  public save(data: any, isNew?: boolean) {

    this.reset();

    if (isNew) {
      this.bankServiceApi.create(data)
          .subscribe(() => {
          });
      // .subscribe(() => this.read(), () => this.read());
    } else {
      this.bankServiceApi.update(data)
          .subscribe(() => {
          });
      // .subscribe(() => this.read(), () => this.read());
    }
  }

  public remove(data: any) {
    this.reset();
    this.bankServiceApi.remove(data)
        .subscribe(() => {
        }); // .subscribe(() => this.read(), () => this.read());
  }

  private reset() {
    this.data = [];
  }

  private fetch(): Observable<BankService[]> {
    return this.bankServiceApi.findAll();
  }

  public actualizaDesdeMessage(bankservices: any[]) {
    console.log(bankservices)
    this.data = bankservices.map(b => <BankService> {id: b.uuid, name: b.name, bankServiceType: b.type});
    this.read();

  }

}

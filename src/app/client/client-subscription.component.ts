import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../model/client';
import { ClientApiService } from '../service/client-api.service';
import { BankServiceApiService } from '../service/bank-service-api.service';
import { BankService } from '../model/bankservice';

@Component({
  selector: 'app-client-subscription',
  templateUrl: './client-subscription.component.html'
})
export class ClientSubscriptionComponent implements OnInit {

  public bankServices: BankService[];

  public selectedService: BankService;

  opened: boolean;

  constructor(private clientApi: ClientApiService, private bankServiceApi: BankServiceApiService) {
  }

  @Output()
  closed = new EventEmitter<boolean>();

  @Input()
  client: Client;

  ngOnInit(): void {
    this.bankServiceApi.findAll()
        .subscribe(data => this.bankServices = data, () => {
        }, () => this.opened = true);
  }

  public onSave(e): void {
    e.preventDefault();
    this.clientApi.subscribeProduct(this.client, this.selectedService.id)
        .subscribe(() => this.closeDialog());

  }

  public onCancel(e): void {
    e.preventDefault();
    this.closeDialog();
  }

  closeDialog(): void {
    this.opened = false;
    this.closed.emit(this.opened);
  }
}

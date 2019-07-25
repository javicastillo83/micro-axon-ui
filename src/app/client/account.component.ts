import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../model/account';
import { Client } from '../model/client';
import { ClientApiService } from '../service/client-api.service';
import { WebSocketAPI } from '../service/websocketapi';
import { WSComponent } from '../wscomponent';
import { RemoveEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit, WSComponent {

  accounts: Account[];
  loading: boolean;
  columns: any[] = [{field: 'number'}, {field: 'balance'}, {field: 'status'}];
  private client: Client;
  webSocketAPI: WebSocketAPI;

  constructor(private clientApi: ClientApiService) {
  }

  @Input()
  public set model(client: Client) {
    this.client = client;
  }

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(this, '/topic/account.updates');
    this.webSocketAPI._connect();
    this.clientApi.accounts(this.client).subscribe(data => this.accounts = data);
  }

  handleMessage(accounts: any) {
    this.accounts = accounts.map(a => <Account> {id: a.uuid, number: a.number, status: a.status, balance: a.balance});

  }

  removeHandler({dataItem}) {
    this.clientApi.unSubscribeProduct(this.client, dataItem.id).subscribe();
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { HttpClientModule } from '@angular/common/http';
import { BodyModule, GridModule, SharedModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BankServiceComponent } from './bankservice/bankservice.component';
import { DropDownListModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { ClientSubscriptionComponent } from './client/client-subscription.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { AccountComponent } from './client/account.component';


const appRoutes: Routes = [
  { path: 'clients', component: ClientComponent },
  { path: 'bankservices',      component: BankServiceComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ClientSubscriptionComponent,
    BankServiceComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GridModule,
    BrowserAnimationsModule,
    SharedModule,
    BodyModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    DropDownListModule,
    ReactiveFormsModule,
    DialogsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

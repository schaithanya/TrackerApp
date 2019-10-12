import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { ExpenseModule } from '../pages/expense/expense.module';
import { DocumentModule } from '../pages/document/document.module';
import { SavingsModule } from '../pages/savings/savings.module';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    ExpenseModule,
    DocumentModule,
    SavingsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp   
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { ExpenseModule } from '../pages/expense/expense.module';
import { DocumentModule } from '../pages/document/document.module';
import { SavingsModule } from '../pages/savings/savings.module';
import { IonicStorageModule } from '@ionic/storage';
import { FileService } from '../utilities/file.service';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { DateService } from '../utilities/date.service';
import { Camera } from '@ionic-native/camera/ngx';

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
  providers: [FileService, File, FileOpener, FileTransfer, FileTransferObject, FileChooser, DateService,
    Camera, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}

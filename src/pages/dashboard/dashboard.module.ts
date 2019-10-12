import { NgModule} from '@angular/core';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';



@NgModule({
declarations: [DashboardComponent],
 imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DashboardComponent
  ],
entryComponents: [
    DashboardComponent   
  ],
})

export class DashboardModule{
  
  
  
}
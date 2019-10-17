import { NgModule} from '@angular/core';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import {  IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MatCardModule } from '@angular/material';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
declarations: [DashboardComponent, CreateComponent, EditComponent],
 imports: [
    CommonModule,
    MatCardModule,    
    IonicModule
  ],
  exports: [
    DashboardComponent,
    CreateComponent,
    EditComponent
  ],
entryComponents: [
    DashboardComponent,
    CreateComponent,
    EditComponent
  ],
})

export class DashboardModule{
  
  
  
}
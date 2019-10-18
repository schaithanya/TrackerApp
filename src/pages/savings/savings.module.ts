import { NgModule } from '@angular/core';
import { SavingsDashboard } from '../savings/savings.dashboard.component';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from '../../app/material.module';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SavingsDashboard, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,    
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule    
  ],
  exports:[ SavingsDashboard, CreateComponent, EditComponent ],
  entryComponents:[ SavingsDashboard, CreateComponent, EditComponent ] 
})

export class SavingsModule{  
}
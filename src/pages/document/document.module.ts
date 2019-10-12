import { NgModule} from '@angular/core';
import { DocumentDashboard } from '../document/document.dashboard.component';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DisplayComponent } from './display/display.component';
import { MaterialModule } from '../../app/material.module';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
declarations: [DocumentDashboard, CreateComponent, EditComponent, DisplayComponent],
 imports: [
    CommonModule,
    IonicModule,
    MaterialModule,    
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    DocumentDashboard,
    CreateComponent,
    EditComponent,
    DisplayComponent 
  ],
entryComponents: [
    DocumentDashboard,
    CreateComponent,
    EditComponent,
    DisplayComponent 
  ]  
})

export class DocumentModule{   
}
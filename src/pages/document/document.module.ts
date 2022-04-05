import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from 'ionic-angular';
import { MaterialModule } from '../../app/material.module';
import { DocumentDashboard } from '../document/document.dashboard.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [DocumentDashboard, CreateComponent, EditComponent],
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
    EditComponent
  ],
  entryComponents: [
    DocumentDashboard,
    CreateComponent,
    EditComponent
  ]
})

export class DocumentModule {
}
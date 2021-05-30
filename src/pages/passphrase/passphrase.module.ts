import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from '../../app/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { PassphraseDashboard } from './passphrase.dashboard.component';

@NgModule({
  declarations: [PassphraseDashboard, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    PassphraseDashboard,
    CreateComponent,
    EditComponent
  ],
  entryComponents: [
    PassphraseDashboard,
    CreateComponent,
    EditComponent
  ]
})

export class PassphraseModule {
}
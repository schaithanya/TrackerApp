import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from 'ionic-angular';
import { MaterialModule } from '../../app/material.module';
import { SavingsDashboard } from '../savings/savings.dashboard.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FilterComponent } from './filter/filter.component';
import { SavingsResult } from './helpers/savings-result/savings-result.component';

@NgModule({
  declarations: [SavingsDashboard, CreateComponent, EditComponent, SavingsResult, FilterComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [SavingsDashboard, CreateComponent, EditComponent, SavingsResult, FilterComponent],
  entryComponents: [SavingsDashboard, CreateComponent, EditComponent, SavingsResult, FilterComponent]
})

export class SavingsModule {
}
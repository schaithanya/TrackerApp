import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../../app/material.module';
import { ExpenseDashboard } from '../expense/expense.dashboard.component';
import { CreateComponent } from './create/create.component';
import { DisplayComponent } from './display/display.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [ExpenseDashboard, CreateComponent, DisplayComponent, FilterComponent],
  imports: [
    CommonModule,
    IonicModule,
    ChartsModule,
    MaterialModule,
    MatNativeDateModule,
  ],
  exports: [
    ExpenseDashboard,
    CreateComponent,
    DisplayComponent,
    FilterComponent
  ],
  entryComponents: [
    ExpenseDashboard,
    CreateComponent,
    DisplayComponent,
    FilterComponent
  ]
})

export class ExpenseModule {
}

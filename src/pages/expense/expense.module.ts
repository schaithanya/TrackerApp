import { NgModule} from '@angular/core';
import { ExpenseDashboard } from '../expense/expense.dashboard.component';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CreateComponent } from './create/create.component';
import { FilterComponent } from './filter/filter.component';
import { ChartsModule } from 'ng2-charts';
import { DisplayComponent } from './display/display.component';
import { MaterialModule } from '../../app/material.module';
import {MatNativeDateModule} from '@angular/material/core';

const Storage_Key = 'expenses';

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

export class ExpenseModule{    
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from 'ionic-angular';
import { NgCalendarModule } from 'ionic2-calendar';
import { MaterialModule } from '../../app/material.module';
import { PlannerDashboard } from '../planner/planner.dashboard.component';
import { CreateComponent } from './create/create.component';
import { BudgetPlannerDashboard } from './budget-planner.dashboard.component';

@NgModule({
  declarations: [BudgetPlannerDashboard, CreateComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgCalendarModule
  ],
  exports: [BudgetPlannerDashboard, CreateComponent],
  entryComponents: [BudgetPlannerDashboard, CreateComponent]
})

export class BudgetPlannerModule {
}
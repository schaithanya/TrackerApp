import { NgModule } from '@angular/core';
import { PlannerDashboard } from '../planner/planner.dashboard.component';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CreateComponent } from './create/create.component';
import { MaterialModule } from '../../app/material.module';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [PlannerDashboard, CreateComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,    
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgCalendarModule    
  ],
  exports:[ PlannerDashboard, CreateComponent ],
  entryComponents:[ PlannerDashboard, CreateComponent ] 
})

export class PlannerModule{  
}
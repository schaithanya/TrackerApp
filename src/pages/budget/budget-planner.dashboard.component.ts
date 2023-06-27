import { Component } from '@angular/core';
import { ActionSheetController, NavController, NavParams, Platform } from 'ionic-angular';
import { DateService } from '../../utilities/date.service';
import { CreateComponent } from './create/create.component';
import { Expense, BudgetPlannerStorageService } from './budget-planner-storage.service';
import { BudgetPlannerSettings } from './budgetPlannerSettings/budget-planner-setting.component';

@Component({
  templateUrl: 'budget-planner.dashboard.component.html',
  styles: ['custom-calendar{height: auto !important; } ion-col{padding:0px;}'],
  providers: [BudgetPlannerStorageService, DateService]
})
export class BudgetPlannerDashboard {
  expenses: Expense[] = [];
  selectedDay = new Date()
  selectedObject
  viewTitle;
  isToday: boolean;
  currDate = new Date();
  calendarModes = [
    { key: 'month', value: 'Month' },
    { key: 'week', value: 'Week' },
    { key: 'day', value: 'Day' },
  ]
  calendar = {
    mode: this.calendarModes[0].key,
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private actionSheetCtrl: ActionSheetController, private plannerService: BudgetPlannerStorageService, private plt: Platform, private dateService: DateService) {
    this.plt.ready().then(() => {
      this.loadExpenses();
    });
  }

  loadExpenses() {
    this.plannerService.getExpenses().then(expenses => {
      if (expenses != null) {
        this.expenses = expenses
      }
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onExpenseSelected(expense) {
    console.log('Expense selected:' + expense.startTime + '-' + expense.endTime + ',' + expense.title);
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    this.currDate = new Date(ev.SelectedTime);
  }
  onCurrentDateChanged(expense: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    expense.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === expense.getTime();

    this.selectedDay = expense;

  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return (date < current);
  };

  addExpense() {
    this.navCtrl.push(CreateComponent);
  }

  navigateToBudgetPlanner() {
    this.navCtrl.push(BudgetPlannerSettings);
  }

  onOptionSelected($expense: any) {
    console.log($expense)
    //this.calendar.mode = $expense
  }

}
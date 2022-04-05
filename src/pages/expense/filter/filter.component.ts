import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { Expense, ExpenseStorageService, Filter } from '../../expense/expense-storage.service';
import { ExpenseDashboard } from '../../expense/expense.dashboard.component';

@Component({
  templateUrl: './filter.component.html',
  providers: [ExpenseStorageService]
})

export class FilterComponent {
  filter: Filter = <Filter>{};
  filteredExpenses: Expense[] = [];
  pickerFormat: string = "DD MM YYYY";

  constructor(private expenseService: ExpenseStorageService, private navCtrl: NavController, private navParams: NavParams) {
    if (this.navParams.get("filterData")) {
      this.filter = <Filter>this.navParams.get("filterData");
    }
  }
  filterExpenses() {
    const isEmpty = Object.values(this.filter).every(x => (x === null || x === ''));
    if (isEmpty) {
      this.clearFilter();
    }
    else if (this.filter.mode) {
      this.filter.startDate = null;
      this.filter.endDate = null;
    }

    this.navCtrl.push(ExpenseDashboard, { filterData: this.filter });
  }
  clearFilter() {
    this.filter = <Filter>{};
  }
  changeMode(mode: string) {
    this.filter.startDate = null;
    this.filter.endDate = null;

    if (mode == this.filter.mode) {
      this.filter.mode = null;
    }
    else {
      this.filter.mode = mode;
    }
  }
}
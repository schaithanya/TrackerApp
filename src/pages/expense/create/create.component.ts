import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DateService } from '../../../utilities/date.service';
import { Expense, ExpenseStorageService } from '../../expense/expense-storage.service';
import { ExpenseDashboard } from '../../expense/expense.dashboard.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers: [ExpenseStorageService, DateService]
})
export class CreateComponent implements OnInit {
  expense: Expense = <Expense>{};
  constructor(private expenseService: ExpenseStorageService, public navCtrl: NavController, public navParams: NavParams,
    private dateService: DateService) { }

  ngOnInit() {
  }

  saveExpense() {
    this.expense.createdDate = this.dateService.getTodaysDate();
    this.expense.id = "Expense" + Date.now();

    this.expenseService.addExpense(this.expense).then(item => {
      this.expense = <Expense>{};
      this.navCtrl.push(ExpenseDashboard);
    });
  }
}
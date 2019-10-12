import { Component, OnInit } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExpenseStorageService, Expense} from '../../expense/expense-storage.service';
import { ExpenseDashboard } from '../../expense/expense.dashboard.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers:[ ExpenseStorageService]     
})
export class CreateComponent implements OnInit {
  expense: Expense = <Expense>{};
  constructor(private expenseService: ExpenseStorageService, public navCtrl: NavController, public navParams: NavParams) { }

  ngOnInit() {
  }

 saveExpense(){
    this.expense.createdDate = Date.now();
    this.expense.id = "Expense" + Date.now();
 
    this.expenseService.addExpense(this.expense).then(item => {
      this.expense = <Expense>{};      
      this.navCtrl.push(ExpenseDashboard);
    });
  }
}
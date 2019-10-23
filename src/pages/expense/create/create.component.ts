import { Component, OnInit } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExpenseStorageService, Expense} from '../../expense/expense-storage.service';
import { ExpenseDashboard } from '../../expense/expense.dashboard.component';
import { DateService } from '../../../utilities/date.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers:[ ExpenseStorageService, DateService]     
})
export class CreateComponent implements OnInit {
  expense: Expense = <Expense>{};
  constructor(private expenseService: ExpenseStorageService, public navCtrl: NavController, public navParams: NavParams, 
    private dateService: DateService) { }

  ngOnInit() {
  }

 saveExpense(){
    this.expense.createdDate = this.dateService.getTodaysDate(); 
    this.expense.id = "Expense" + Date.now();
 
    this.expenseService.addExpense(this.expense).then(item => {
      this.expense = <Expense>{};      
      this.navCtrl.push(ExpenseDashboard);
    });
  }
}
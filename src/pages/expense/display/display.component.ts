import { Component, OnInit } from '@angular/core';
import{ IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MatTableDataSource } from '@angular/material';
import {ExpenseStorageService, Expense, Filter} from '../../expense/expense-storage.service';
import {ExpenseDashboard} from '../../expense/expense.dashboard.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styles: ['table { width: 100%; } .delete-button { border-radius: 50%; width: 2em; height: 2em; display: flex; justify-content: center; align-items: center; } '],
  providers:[ ExpenseStorageService]     
})
export class DisplayComponent implements OnInit {
  filter: Filter = <Filter>{};    
  expenses: Expense[] = [];
   displayedColumns: string[] = ['delete','type', 'amount'];
  dataSource = new MatTableDataSource(this.expenses); 
  expenseType: string = this.navParams.get('expenseType');  

  constructor(private expenseService: ExpenseStorageService, private navCtrl: NavController, private navParams: NavParams, private plt: Platform) {        
    this.plt.ready().then(() => {
      if(navParams.get("filterData")){
        this.filter = <Filter>this.navParams.get("filterData");
      }  
      this.loadItems();
    });
   }

   ionViewWillLeave() {
     this.navCtrl.push(ExpenseDashboard, {filterData: this.filter});
   }

  loadItems(){
    this.expenseService.getExpenses().then(expenses => {
      this.expenses = expenses.filter((item: Expense) => item.type === this.expenseType);
      this.dataSource = new MatTableDataSource(this.expenses);      
     })
  }   

  deleteExpense(expense: Expense){
    this.expenseService.removeExpense(expense.id).then(item => {
      this.loadItems();
    });
  } 
  ngOnInit() {
  }

}
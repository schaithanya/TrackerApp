import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import {ExpenseStorageService, Expense} from '../expense/expense-storage.service';
import {CreateComponent} from '../expense/create/create.component';
import {DisplayComponent} from '../expense/display/display.component';

@Component({
  selector: 'ExpenseDashboard',
  templateUrl: 'expense.dashboard.component.html',
  providers:[ ExpenseStorageService]   
})
export class ExpenseDashboard {
  // Doughnut
  public doughnutChartLabels:string[] = [];
  public demodoughnutChartData:any[] = [];
  public doughnutChartType:string = 'doughnut';
 

  expenses: Expense[] = [];
  expensesDisplay: {};
  expense: Expense = <Expense>{};
  total: any = 0;

  constructor(private expenseService: ExpenseStorageService, private plt: Platform, public navCtrl: NavController) {
   this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  loadItems(){
    this.demodoughnutChartData = [];
    this.doughnutChartLabels = [];
    this.expenseService.getExpenses().then(expenses => {          
      this.expenses = expenses;      
      var groups = this.expenses.reduce(function(obj, val) {
        if ( obj[val.type] ) {
          obj[val.type] += parseInt(val.amount);                
        } else {
          obj[val.type] = parseInt(val.amount);           
        }
        return obj;
      }, {});    
      this.expensesDisplay = groups;      
      this.total = Object.values(groups).reduce((a, b) => +a + +b, 0)
      this.demodoughnutChartData.push(Object.values(groups));
      this.doughnutChartLabels = Object.keys(groups);
      });
  }   

   // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  private createExpense(){
    this.navCtrl.push(CreateComponent);
  }

  private showDetailExpense(type: string){
    console.log(type);
    this.navCtrl.push(DisplayComponent, {expenseType: type});
  }
}

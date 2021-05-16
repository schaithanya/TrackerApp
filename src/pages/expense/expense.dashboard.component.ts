import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import {ExpenseStorageService, Expense, Filter} from '../expense/expense-storage.service';
import {CreateComponent} from '../expense/create/create.component';
import {DisplayComponent} from '../expense/display/display.component';
import {DateService} from '../../utilities/date.service';
import {FilterComponent} from '../expense/filter/filter.component';

@Component({
  selector: 'ExpenseDashboard',
  templateUrl: 'expense.dashboard.component.html',
  providers:[ ExpenseStorageService, DateService]   
})
export class ExpenseDashboard {

  filter: Filter = <Filter>{};    

  // Doughnut
  public doughnutChartLabels:string[] = [];
  public demodoughnutChartData:any[] = [];
  public doughnutChartType:string = 'doughnut';
 
  expenses: Expense[] = [];
  expensesDisplay: {};
  expense: Expense = <Expense>{};
  total: any = 0;

  constructor(private expenseService: ExpenseStorageService, private plt: Platform, public navCtrl: NavController,
    private navParams: NavParams,
    private dateService: DateService) {
   this.plt.ready().then(() => {
      if(navParams.get("filterData")){
        this.filter = <Filter>this.navParams.get("filterData");
      }  
      this.loadItems();
    });
  }

  loadItems(){
    this.demodoughnutChartData = [];
    this.doughnutChartLabels = [];
    this.expenseService.getExpenses().then(expenses => {                
      if(expenses != null)
      {
        this.expenses = expenses;
        if(Object.keys(this.filter).length != 0){                  
          this.expenses = this.expenses.filter((item: Expense) =>             
              (this.filter.mode == null || this.filterByMode(this.filter.mode,item.createdDate))  
              && (this.filter.type == null || item.type == this.filter.type) 
              && (this.filter.startDate == null  || (new Date(item.createdDate) >= new Date( this.filter.startDate)))
              && (this.filter.endDate == null || new Date(item.createdDate) <= new Date(this.filter.endDate)))
        }

        this.getExpenseDisplayItems(this.expenses);
      } 
    });
  }   

  getExpenseDisplayItems(expenses){
    var groups = expenses.reduce(function(obj, val) {
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
    this.navCtrl.push(DisplayComponent, {expenseType: type, filterData: this.filter});
  }

  private showFilterExpenses(){    
    this.navCtrl.push(FilterComponent, {filterData: this.filter});
  }

  public filterByMode(mode, date){
    if(mode == 'week'){
      return this.filterDatesByCurrentWeek(date);
    }
    else if(mode == 'month'){
      return this.filterDatesByCurrentMonth(date);
    }
    else if(mode == 'year'){
      return this.filterDatesByCurrentYear(date);
    }
  }
  filterDatesByCurrentWeek(date){
    let [start, end] = this.dateService.getWeekDates();
    let createdDate = new Date(date);
    return createdDate >= start && createdDate <= end;
  }

  filterDatesByCurrentMonth(date){
    let createdDate = new Date(date);
    let now = new Date();
    return now.getMonth() == createdDate.getMonth() && now.getFullYear() == createdDate.getFullYear();   
  }
  
  filterDatesByCurrentYear(date){    
    let createdDate = new Date(date);
    let now = new Date();
    return now.getFullYear() == createdDate.getFullYear();
  }
}

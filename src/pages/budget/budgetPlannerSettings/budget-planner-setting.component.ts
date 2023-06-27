import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NavController, NavParams } from 'ionic-angular';
import { FileInfo, FileService } from '../../../utilities/file.service';
import { BudgetPlannerStorageService, Expense, ExpenseType, ExpenseTypes} from '../budget-planner-storage.service';
import { BudgetPlannerDashboard } from '../budget-planner.dashboard.component';
import * as ArrayHelper from '../../../helpers/arrayHelpers';

@Component({
  selector: 'budget=planner-setting',
  templateUrl: './budget-planner-setting.component.html',
  providers: [BudgetPlannerStorageService, LocalNotifications, FileService]
})

export class BudgetPlannerSettings implements OnInit {
  url = '';
  fileType: any;
  fileInfo: FileInfo = <FileInfo>{};
  moduleName = "Budget Planner";

  expense: Expense = <Expense>{};
  expenseTypes: ExpenseType[] = ExpenseTypes;
  constructor(private budgetPlannerService: BudgetPlannerStorageService, private navCtrl: NavController, public navParams: NavParams, private localNotifications: LocalNotifications, private fileService: FileService) { }

  ngOnInit() {
  }

  private saveExpenseData() {
    this.expense.id = "BudgetPlanner" + Date.now();
    this.budgetPlannerService.addExpense(this.expense).then(item => {
      this.localNotifications.schedule({
        text: 'Check for saving item!!',
        trigger: { at: new Date(new Date().getTime() + 36000) },
        led: 'FF0000',
        sound: null
      });
      this.navCtrl.push(BudgetPlannerDashboard);
    });
  }

}



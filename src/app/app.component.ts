import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ExpenseDashboard } from '../pages/expense/expense.dashboard.component';
import { DocumentDashboard } from '../pages/document/document.dashboard.component';
import { SavingsDashboard } from '../pages/savings/savings.dashboard.component';
import { PlannerDashboard } from '../pages/planner/planner.dashboard.component';
import { FileService } from '../utilities/file.service';
import { PassphraseDashboard } from '../pages/passphrase/passphrase.dashboard.component';
import { BudgetPlannerDashboard } from '../pages/budget/budget-planner.dashboard.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
 
  rootPage: any = SavingsDashboard;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private fileService: FileService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Savings Tracker', component: SavingsDashboard},
      { title: 'Document Tracker', component: DocumentDashboard } ,  
      { title: 'Passphrase Tracker', component: PassphraseDashboard } ,  
      { title: 'Expense Tracker', component: ExpenseDashboard },
      { title: 'My Story', component: DashboardComponent }, 
      {title: 'My Scheduler', component: PlannerDashboard},
      {title: 'Budget Planner', component: BudgetPlannerDashboard}         
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.fileService.createAppDirectory();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

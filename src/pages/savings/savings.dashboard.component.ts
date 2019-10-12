import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { CreateComponent } from '../savings/create/create.component';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { SavingsStorageService, Saving} from '../savings/savings-storage.service';

@Component({  
  templateUrl: 'savings.dashboard.component.html',
  styles: ['table { width: 100%; } .delete-button { border-radius: 50%; width: 2em; height: 2em; display: flex; justify-content: center; align-items: center; }'],
  providers:[ SavingsStorageService]   
})

export class SavingsDashboard {
  savings: Saving[] = [];
  saving: Saving = <Saving>{};      

  selection = new SelectionModel<Saving>(true, []);
  displayedColumns: string[] = ['select','name','type', 'amount', 'createdDate', 'endDate', 'documentPath'];
  dataSource = new MatTableDataSource(this.savings); 
  
  constructor(private savingsService: SavingsStorageService, private plt: Platform, public navCtrl: NavController) {
    
   this.plt.ready().then(() => {      
      this.loadItems();
    });
  }

  loadItems(){
    this.savingsService.getSavingsData().then(savingsData => {    
      if (savingsData != null)      
      {        
        this.savings = savingsData;                      
        this.dataSource = new MatTableDataSource(this.savings);
      }      
    });    
  } 
  
  deleteDocuments(saving: Saving){         
     this.savingsService.removeExpense(saving.id);
     this.reload();   
  }

  editDocumentData(document: Document){
    //this.navCtrl.push(EditComponent, {document : this.document});
  }

  applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reload() {
    let active = this.navCtrl.getActive(); 
    this.navCtrl.remove(active.index);
    this.navCtrl.push(active.component);
  }
  
  createSaving(){
    this.navCtrl.push(CreateComponent);
  }

  viewSavingsDocument(document: Document){      
    //this.navCtrl.push(DisplayComponent, {documentData : document});
  }
}


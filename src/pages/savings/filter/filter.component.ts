import { Component } from "@angular/core";
import {SavingsStorageService, Saving, Filter} from '../../savings/savings-storage.service';
import{ NavController, NavParams } from 'ionic-angular';
import { SavingsDashboard } from '../../savings/savings.dashboard.component';

@Component({
  templateUrl: './filter.component.html',
  providers:[ SavingsStorageService]    
})

export class FilterComponent{  
  filter: Filter = <Filter>{};    
  filteredSavings: Saving[] = [];  
  pickerFormat: string ="DD MM YYYY";

  constructor(private expenseService: SavingsStorageService, private navCtrl: NavController, private navParams: NavParams){    
    if(this.navParams.get("filterData")){
      this.filter = <Filter>this.navParams.get("filterData");
    }  
  }
  filterSavings(){          
    const isEmpty = Object.values(this.filter).every(x => (x === null || x === ''));
    if(isEmpty)
    {
      this.clearFilter();
    }
    // else if(this.filter.mode){
    //     this.filter.startDate = null;
    //     this.filter.endDate = null;
    // }

    this.navCtrl.push(SavingsDashboard, {filterData: this.filter});    
  }
  clearFilter(){    
    this.filter = <Filter>{};    
  }
}
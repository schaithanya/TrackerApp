import { Component, OnInit } from '@angular/core';
import{ IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SavingsStorageService, Saving} from '../../savings/savings-storage.service';
import { SavingsDashboard } from '../../savings/savings.dashboard.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',  
  providers:[ SavingsStorageService]   
})
export class EditComponent implements OnInit {
  fileType: any;
  url:any;
  saving: Saving = this.navParams.get('savingsData');
  constructor(private savingService: SavingsStorageService, public navCtrl: NavController, public navParams: NavParams, private plt: Platform) {
    this.plt.ready().then(() => {
      this.loadItems();
    });   
   }

  ngOnInit() {
  }  
  
  onSelectFile(event) {    
    this.saving.documentPath = event.target.files[0];    
    this.fileType =  this.saving.documentPath.type;    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        let target: any = event.target; 
        this.url = target.result
      }
    }
  }

  loadItems(){    
    this.fileType =  this.saving.documentPath.type; 
    var reader = new FileReader();
      reader.readAsDataURL(this.saving.documentPath); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        let target: any = event.target; 
        this.url = target.result
      }
  }  

   private updateSavingData(){                  
    this.savingService.updateSaving(this.saving).then(item => {
      this.navCtrl.push(SavingsDashboard);
    });
  }
}
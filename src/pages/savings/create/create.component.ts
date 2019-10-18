import { Component, OnInit, ElementRef  } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import { SavingsStorageService, Saving} from '../../savings/savings-storage.service';
import { SavingsDashboard } from '../../savings/savings.dashboard.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',    
  providers:[SavingsStorageService, LocalNotifications]   
})

export class CreateComponent implements OnInit {     
  url = '';
  fileType: any;

  saving: Saving = <Saving>{};
  constructor(private savingsService: SavingsStorageService, private navCtrl: NavController, public navParams: NavParams, private localNotifications: LocalNotifications) { }

  ngOnInit() {
  }

 private saveSavingsData(){       
    this.saving.id = "Saving" + Date.now();         
    this.savingsService.addSavingsData(this.saving).then(item => {      
      this.localNotifications.schedule({
      text: 'Check for saving item!!',
      trigger: {at: new Date(new Date().getTime() + 36000)},
      led: 'FF0000',
      sound: null
      });
      console.log(this.localNotifications);
      this.navCtrl.push(SavingsDashboard);
    });
  }    
  onSelectFile(event) {    
    this.saving.documentPath = event.target.files[0];   
    this.fileType = this.saving.documentPath.type; 
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        let target: any = event.target; 
        this.url = target.result
      }
    }
  }


}
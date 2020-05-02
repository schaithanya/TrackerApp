import { Component, OnInit, ElementRef  } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import { SavingsStorageService, Saving} from '../../savings/savings-storage.service';
import { SavingsDashboard } from '../../savings/savings.dashboard.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FileService, FileInfo} from '../../../utilities/file.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',    
  providers:[SavingsStorageService, LocalNotifications, FileService]   
})

export class CreateComponent implements OnInit {     
  url = '';
  fileType: any;
  fileInfo: FileInfo = <FileInfo>{};
  moduleName = "Savings";

  saving: Saving = <Saving>{};
  constructor(private savingsService: SavingsStorageService, private navCtrl: NavController, public navParams: NavParams, private localNotifications: LocalNotifications, private fileService: FileService) { }

  ngOnInit() {
  }

 private saveSavingsData(){       
    this.saving.id = "Saving" + Date.now();       
    this.saving.documentType = this.fileInfo.fileType;
    this.saving.documentExt = this.fileInfo.fileExt;
    this.fileInfo.fileName = this.saving.id;
    this.fileInfo.moduleName = this.moduleName;
        
    this.savingsService.addSavingsData(this.saving, this.fileInfo).then(item => {      
      this.localNotifications.schedule({
      text: 'Check for saving item!!',
      trigger: {at: new Date(new Date().getTime() + 36000)},
      led: 'FF0000',
      sound: null
      });     
      this.navCtrl.push(SavingsDashboard);
    });
  }    
  onSelectFile(){
    this.fileInfo = this.fileService.chooseFile();
  }
}



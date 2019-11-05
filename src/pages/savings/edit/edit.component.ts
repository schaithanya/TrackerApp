import { Component, OnInit } from '@angular/core';
import{ IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SavingsStorageService, Saving} from '../../savings/savings-storage.service';
import { SavingsDashboard } from '../../savings/savings.dashboard.component';
import { FileService, FileInfo} from '../../../utilities/file.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',  
  providers:[ SavingsStorageService]   
})
export class EditComponent implements OnInit {
  fileType: any;
  url:any;
  fileInfo: FileInfo = <FileInfo>{};

  saving: Saving = this.navParams.get('savingsData');
  constructor(private savingService: SavingsStorageService, public navCtrl: NavController, public navParams: NavParams, private plt: Platform, private fileService: FileService) {
    this.plt.ready().then(() => {
      this.loadItems();
    });   
   }

  ngOnInit() {
  }  
  
  onSelectFile() {    
    this.fileInfo = this.fileService.chooseFile();
  }

  loadItems(){    
    this.fileType =  this.saving.documentPath.type; 
    this.url = this.saving.documentPath;    
  }  

   private updateSavingData(){                  
    this.saving.documentType = this.fileInfo.fileType;
    this.saving.documentExt = this.fileInfo.fileExt;
    this.fileInfo.fileName = this.saving.id;

    this.savingService.updateSaving(this.saving, this.fileInfo).then(item => {
      this.navCtrl.push(SavingsDashboard);
    });
  }
}
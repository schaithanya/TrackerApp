import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NavController, NavParams } from 'ionic-angular';
import { FileInfo, FileService } from '../../../utilities/file.service';
import { Saving, SavingsStorageService } from '../../savings/savings-storage.service';
import { SavingsDashboard } from '../../savings/savings.dashboard.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers: [SavingsStorageService, LocalNotifications, FileService]
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

  private saveSavingsData() {
    this.saving.id = "Saving" + Date.now();
    this.saving.documentType = this.fileInfo.fileType;
    this.saving.documentExt = this.fileInfo.fileExt;
    this.fileInfo.fileName = this.saving.id;
    this.fileInfo.moduleName = this.moduleName;
    this.saving.interest = (+this.saving.matAmount - +this.saving.amount).toFixed(2);

    this.savingsService.addSavingsData(this.saving, this.fileInfo).then(item => {
      this.localNotifications.schedule({
        text: 'Check for saving item!!',
        trigger: { at: new Date(new Date().getTime() + 36000) },
        led: 'FF0000',
        sound: null
      });
      this.navCtrl.push(SavingsDashboard);
    });
  }
  onSelectFile() {
    this.fileInfo = this.fileService.chooseFile();
  }
}



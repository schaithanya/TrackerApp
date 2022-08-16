import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { FileInfo, FileService } from '../../../utilities/file.service';
import { Saving, SavingsStorageService } from '../../savings/savings-storage.service';
import { SavingsDashboard } from '../../savings/savings.dashboard.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [SavingsStorageService]
})
export class EditComponent implements OnInit {
  fileType: any;
  url: any;
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

  loadItems() {
    this.fileType = this.saving.documentPath.type;
    this.url = this.saving.documentPath;
  }
}
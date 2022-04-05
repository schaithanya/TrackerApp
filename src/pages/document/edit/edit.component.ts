import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { FileInfo, FileService } from '../../../utilities/file.service';
import { Document, DocumentStorageService } from '../../document/document-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [DocumentStorageService]
})
export class EditComponent implements OnInit {
  fileType: any;
  url: any;
  fileInfo: FileInfo = <FileInfo>{};
  folderName: string = "Documents";

  document: Document = this.navParams.get('document');
  constructor(public navCtrl: NavController, public navParams: NavParams, private plt: Platform, private fileService: FileService) {
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
    this.fileType = this.document.documentPath.type;
    this.url = this.document.documentName;
  }
}
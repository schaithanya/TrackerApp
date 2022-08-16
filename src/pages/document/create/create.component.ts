import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { NavController, NavParams } from 'ionic-angular';
import { FileInfo, FileService } from '../../../utilities/file.service';
import { Document, DocumentStorageService } from '../../document/document-storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers: [DocumentStorageService, FileChooser, FilePath, File, FileTransfer, FileTransferObject, FileService]
})

export class CreateComponent implements OnInit {
  fileInfo: FileInfo = <FileInfo>{};
  folderName: string = "Documents";
  document: Document = <Document>{};
  constructor(public navCtrl: NavController, public navParams: NavParams, private fileService: FileService) { }

  ngOnInit() {
  }


  onSelectFile() {
    this.fileInfo = this.fileService.chooseFile();
  }
}
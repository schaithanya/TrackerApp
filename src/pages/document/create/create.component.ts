import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { NavController, NavParams } from 'ionic-angular';
import { FileInfo, FileService } from '../../../utilities/file.service';
import { Document, DocumentStorageService } from '../../document/document-storage.service';
import { DocumentDashboard } from '../../document/document.dashboard.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers: [DocumentStorageService, FileChooser, FilePath, File, FileTransfer, FileTransferObject, FileService]
})

export class CreateComponent implements OnInit {
  fileInfo: FileInfo = <FileInfo>{};
  folderName: string = "Documents";
  document: Document = <Document>{};
  constructor(private documentService: DocumentStorageService, public navCtrl: NavController, public navParams: NavParams, private fileChooser: FileChooser, private filePath: FilePath,
    private file: File, private transfer: FileTransfer, private fileService: FileService) { }

  ngOnInit() {
  }

  private saveDocumentData() {
    this.document.id = "Document" + Date.now();
    this.document.type = this.fileInfo.fileType;
    this.document.ext = this.fileInfo.fileExt;
    this.fileInfo.fileName = this.document.id;
    this.fileInfo.moduleName = this.folderName;
    this.documentService.addDocument(this.document, this.fileInfo).then(item => {
      this.navCtrl.push(DocumentDashboard);
    });
  }

  onSelectFile() {
    this.fileInfo = this.fileService.chooseFile();
  }
}
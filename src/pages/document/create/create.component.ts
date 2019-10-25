import { Component, OnInit, ElementRef  } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentStorageService, Document} from '../../document/document-storage.service';
import {DocumentDashboard} from '../../document/document.dashboard.component';
import {FileInfo} from '../../../utilities/file.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { FileService } from '../../../utilities/file.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',    
  providers:[ DocumentStorageService, FileChooser, FilePath, File, FileTransfer, FileTransferObject, FileService]   
})

export class CreateComponent implements OnInit {     
  fileInfo: FileInfo = <FileInfo>{};

  document: Document = <Document>{};
  constructor(private documentService: DocumentStorageService, public navCtrl: NavController, public navParams: NavParams,private fileChooser: FileChooser, private filePath: FilePath,
    private file: File, private transfer: FileTransfer, private fileService: FileService) { }

  ngOnInit() {
  }

 private saveDocumentData(){       
    this.document.id = "Document" + Date.now();    
    this.document.type = this.fileInfo.fileType;
    this.document.ext = this.fileInfo.fileExt;
    this.fileInfo.fileName = this.document.documentName;
    this.documentService.addDocument(this.document, this.fileInfo).then(item => {      
    this.navCtrl.push(DocumentDashboard);
    });
  }    
  
  onSelectFile(){
    this.fileInfo = this.fileService.chooseFile();
  }
}
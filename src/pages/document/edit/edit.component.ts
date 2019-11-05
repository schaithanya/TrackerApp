import { Component, OnInit } from '@angular/core';
import{ IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DocumentStorageService, Document} from '../../document/document-storage.service';
import {DocumentDashboard} from '../../document/document.dashboard.component';
import { FileService, FileInfo} from '../../../utilities/file.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',  
  providers:[ DocumentStorageService]   
})
export class EditComponent implements OnInit {
  fileType: any;
  url: any;
   fileInfo: FileInfo = <FileInfo>{};

  document: Document = this.navParams.get('document');
  constructor(private documentService: DocumentStorageService, public navCtrl: NavController, public navParams: NavParams, private plt: Platform, private fileService: FileService) { 
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
    this.fileType =  this.document.documentPath.type; 
    this.url = this.document.documentName;    
  }  

   private updateDocumentData(){            
    this.document.type = this.fileInfo.fileType;
    this.document.ext = this.fileInfo.fileExt;
    this.fileInfo.fileName = this.document.id;

    this.documentService.updateDocumentData(this.document, this.fileInfo).then(item => {
      this.navCtrl.push(DocumentDashboard);
    });
  }
}
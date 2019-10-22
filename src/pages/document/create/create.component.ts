import { Component, OnInit, ElementRef  } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentStorageService, Document} from '../../document/document-storage.service';
import {DocumentDashboard} from '../../document/document.dashboard.component';
import {FileService} from '../../../utilities/file.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',    
  providers:[ DocumentStorageService, FileService, FileChooser, FilePath]   
})

export class CreateComponent implements OnInit {     
  url: any;
  fileType: any;

  document: Document = <Document>{};
  constructor(private documentService: DocumentStorageService, public navCtrl: NavController, public navParams: NavParams,private fileChooser: FileChooser, private filePath: FilePath) { }

  ngOnInit() {
  }

 private saveDocumentData(){       
    this.document.id = "Document" + Date.now();    
    this.document.documentPath = this.url;         
    alert(this.document.documentPath);
    this.documentService.addDocument(this.document).then(item => {      
      this.navCtrl.push(DocumentDashboard);
    });
  }    
  onSelectFile() {    
    this.url = this.onChooseFile();
    this.document.documentPath = this.url;
  }

  onChooseFile(){
    this.fileChooser.open().then(url => {
      //  this.filePath.resolveNativePath(url).then(filePathUrl => {
      //   return filePathUrl;
      // })      
      alert("Url"+ url);
      this.filePath.resolveNativePath(url).then(filePathUrl => {
        alert("file Path Url " + filePathUrl);
        return filePathUrl;
      })
    })
  }
}
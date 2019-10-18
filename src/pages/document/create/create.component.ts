import { Component, OnInit, ElementRef  } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentStorageService, Document} from '../../document/document-storage.service';
import {DocumentDashboard} from '../../document/document.dashboard.component';
import {FileService} from '../../../utilities/file.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',    
  providers:[ DocumentStorageService, FileService]   
})

export class CreateComponent implements OnInit {     
  url: any;
  fileType: any;

  document: Document = <Document>{};
  constructor(private documentService: DocumentStorageService, public navCtrl: NavController, public navParams: NavParams) { }

  ngOnInit() {
  }

 private saveDocumentData(){       
    this.document.id = "Document" + Date.now();             
    this.documentService.addDocument(this.document).then(item => {      
      this.navCtrl.push(DocumentDashboard);
    });
  }    
  onSelectFile(event) {    
    this.document.documentPath = event.target.files[0];  
    this.fileType = this.document.documentPath.type;
      
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        let target: any = event.target; 
        this.url = target.result
      }
    }
  }


}
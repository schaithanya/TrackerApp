import { Component, OnInit } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentStorageService, Document} from '../../document/document-storage.service';
import {DocumentDashboard} from '../../document/document.dashboard.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',  
  providers:[ DocumentStorageService]   
})
export class EditComponent implements OnInit {
  url:any = '';
  document: Document = this.navParams.get('document');
  constructor(private documentService: DocumentStorageService, public navCtrl: NavController, public navParams: NavParams) { }

  ngOnInit() {
  }  
  
  onSelectFile(event) {    
    this.document.documentPath = event.target.files[0];    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        let target: any = event.target; 
        this.url = target.result;
      }
    }
  }

   private updateDocumentData(){                  
    this.documentService.updateDocumentData(this.document).then(item => {
      this.navCtrl.push(DocumentDashboard);
    });
  }
}
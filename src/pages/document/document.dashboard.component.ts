import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { CreateComponent } from '../document/create/create.component';
import { EditComponent } from '../document/edit/edit.component';
import { DisplayComponent } from '../document/display/display.component';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { DocumentStorageService, Document} from '../document/document-storage.service';

@Component({
  selector: 'DocumentDashboard',
  templateUrl: 'document.dashboard.component.html',
  styles: ['table { width: 100%; } .delete-button { border-radius: 50%; width: 2em; height: 2em; display: flex; justify-content: center; align-items: center; }'],
  providers:[ DocumentStorageService]   
})

export class DocumentDashboard {
  documents: Document[] = [];
  document: Document = <Document>{};      

  selection = new SelectionModel<Document>(true, []);
  displayedColumns: string[] = ['select','documentName','type', 'documentPath'];
  dataSource = new MatTableDataSource(this.documents); 
  
  constructor(private documentService: DocumentStorageService, private plt: Platform, public navCtrl: NavController) {
    
   this.plt.ready().then(() => {      
      this.loadItems();
    });
  }

  loadItems(){
    this.documentService.getDocumentData().then(documentData => {    
      if (documentData != null)      
      {        
        this.documents = documentData;                      
        this.dataSource = new MatTableDataSource(this.documents);
      }      
    });    
  } 
  
  deleteDocuments(document: Document){         
     this.documentService.removeDocumentData(document.id);
     this.reload();   
  }

  editDocumentData(document: Document){
    this.document = document;
    this.navCtrl.push(EditComponent, {document : this.document});
  }

  applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reload() {
    let active = this.navCtrl.getActive(); 
    this.navCtrl.remove(active.index);
    this.navCtrl.push(active.component);
  }
  
  createDocument(){
    this.navCtrl.push(CreateComponent);
  }

  viewDocument(document: Document){      
    this.navCtrl.push(DisplayComponent, {documentData : document});
  }
}


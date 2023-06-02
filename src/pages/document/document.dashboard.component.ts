import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Storage } from '@ionic/storage';
import { NavController, Platform } from 'ionic-angular';
import { FileService } from '../../utilities/file.service';
import { CreateComponent } from '../document/create/create.component';
import { Document, DocumentStorageService } from '../document/document-storage.service';
import { EditComponent } from '../document/edit/edit.component';

const Storage_Key = 'documents';

@Component({
  selector: 'DocumentDashboard',
  templateUrl: 'document.dashboard.component.html',
  styles: ['table { width: 100%; } .delete-button { border-radius: 50%; width: 2em;height: 2em; display: flex; justify-content: center; align-items: center; }'],
  providers:[ DocumentStorageService]   
})

export class DocumentDashboard {
  documents: Document[] = [];
  document: Document = <Document>{};      
  url: any;

  selection = new SelectionModel<Document>(true, []);
  displayedColumns: string[] = ['documentName', 'documentPath','download', 'select'];
  dataSource = new MatTableDataSource(this.documents); 
  
  constructor(private documentService: DocumentStorageService, private plt: Platform, public navCtrl: NavController, private fileService: FileService, private storage: Storage) {    
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
    this.storage.get(Storage_Key).then(results => {
      this.fileService.removeFile(document.id);
      let resultValues = [];
        for(let result of results){
          if(result.id !== document.id){
            resultValues.push(result);
        }
      }
      
      this.storage.set(Storage_Key, resultValues);
      this.documents = resultValues;
      this.dataSource = new MatTableDataSource(this.documents); 
  });
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
    this.fileService.openFile(document.documentPath, document.type);
  }

  downloadDocument(document: Document){    
    this.fileService.downloadFile(document.id);    
  }
}


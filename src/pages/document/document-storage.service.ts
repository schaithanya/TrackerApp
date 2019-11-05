import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FileService, FileInfo } from '../../utilities/file.service';

const Storage_Key = 'documents';

export interface Document{
  id: string,
  documentName: string,
  documentPath: any,
  type: string,
  ext: string
}

@Injectable()
export class DocumentStorageService {
  
  constructor(private storage: Storage, private fileService: FileService){                
  }

  public async getDocumentData(): Promise<Document[]>{         
    return await this.storage.get(Storage_Key);
  }

  public addDocument(document: Document, fileInfo: FileInfo)
  {     
    return this.getDocumentData().then((results: Document[]) => {
      if(results)
      { 
        let result = this.fileService.saveFile(fileInfo);
        document.documentPath = result;                
        results.push(document);
        return this.storage.set(Storage_Key, results);
      }
      else
      {        
        let result = this.fileService.saveFile(fileInfo);
        document.documentPath = result;                
        return this.storage.set(Storage_Key, [document]);
      }
    });    
  }

  public async removeDocumentData(document: Document){
    return this.getDocumentData().then((results: Document[])  => {        
      if(!results || results.length == 0){
        return null;
      }

      this.fileService.removeFile(document.id);
      let newItems: Document[] = [];      
      for(let result of results){
        if(result.id !== document.id){
          newItems.push(result);      
        }
      }                       
      this.storage.set(Storage_Key, newItems);
    });    
  }      

  public async updateDocumentData(document: Document, fileInfo: FileInfo)
  {
    return this.getDocumentData().then((results: Document[]) => {
      if(!results || results.length == 0){
        return null;
      }

      // Remove and create new file 
      this.fileService.removeFile(document.id);
      let result = this.fileService.saveFile(fileInfo);
      document.documentPath = result;

      let newItems: Document[] = [];

      for(let result of results){
        if(result.id == document.id){
          newItems.push(document);          
        }
        else{
          newItems.push(result);
        }
      }
      return this.storage.set(Storage_Key, newItems);
    });
  }
}
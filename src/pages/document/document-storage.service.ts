import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const Storage_Key = 'documents';

export interface Document{
  id: string,
  documentName: string,
  documentPath: any,
  type: string 
}

@Injectable()
export class DocumentStorageService {
  constructor(private storage: Storage){            
  }

  public async getDocumentData(): Promise<Document[]>{         
    return await this.storage.get(Storage_Key);
  }

  public addDocument(document: Document)
  {     
    return this.getDocumentData().then((results: Document[]) => {
      if(results)
      {         
        results.push(document);
        return this.storage.set(Storage_Key, results);
      }
      else
      {        
        return this.storage.set(Storage_Key, [document]);
      }
    });    
  }

  public async removeDocumentData(documentId: string){
    return this.getDocumentData().then((results: Document[])  => {        
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Document[] = [];      
      for(let result of results){
        if(result.id !== documentId){
          newItems.push(result);      
        }
      }        
      console.log(newItems);      
      this.storage.set(Storage_Key, newItems);
    });    
  }      

  public async updateDocumentData(document: Document)
  {
    return this.getDocumentData().then((results: Document[]) => {
      if(!results || results.length == 0){
        return null;
      }

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
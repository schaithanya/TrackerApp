import { Injectable } from '@angular/core';
import { TrustedHtmlString } from '@angular/core/src/sanitization/bypass';
import { Storage } from '@ionic/storage';
import { FileService, FileInfo } from '../../utilities/file.service';

const Storage_Key = 'savings';

export interface Saving{
  id: string,
  name: string,
  type : string,
  amount: number,
  matAmount:number,
  createdDate: number,
  endDate: Date,
  reminderDate: Date,
  documentPath: any,
  documentType: string,
  documentExt: string,
  comments: string,
  interest: string  
}
export interface Filter{
  type: string,
  name: string
}

@Injectable()
export class SavingsStorageService{
  constructor(private storage: Storage, private fileService: FileService){            
  }

  public async getSavingsData(): Promise<Saving[]>{    
    return await this.storage.get(Storage_Key);
  }

  public addSavingsData(newSaving: Saving, fileInfo: FileInfo)
  {
    return this.getSavingsData().then((results: Saving[]) => {
      if(results)
      {
        let result = this.fileService.saveFile(fileInfo);
        newSaving.documentPath = result;   
        results.push(newSaving);
        return this.storage.set(Storage_Key, results);
      }
      else
      {
        let result = this.fileService.saveFile(fileInfo);
        newSaving.documentPath = result;   
        return this.storage.set(Storage_Key, [newSaving]);
      }
    });    
  }
  
  public async updateSaving(saving: Saving, fileInfo: FileInfo)
  {
    return this.getSavingsData().then((results: Saving[]) => {
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Saving[] = [];

      // Remove and create new file 
      this.fileService.removeFile(saving.id);
      let result = this.fileService.saveFile(fileInfo);
      saving.documentPath = result;   

      for(let result of results){
        if(result.id == saving.id){
          newItems.push(saving);          
        }
        else{
          newItems.push(result);
        }
      }
      return this.storage.set(Storage_Key, newItems);
    });
  }
}

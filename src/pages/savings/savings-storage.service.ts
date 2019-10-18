import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const Storage_Key = 'savings';

export interface Saving{
  id: string,
  name: string,
  type : string,
  amount: number,
  createdDate: number,
  endDate: Date,
  documentPath: any,
  comments: string
}


@Injectable()
export class SavingsStorageService{
  constructor(private storage: Storage){            
  }

  public async getSavingsData(): Promise<Saving[]>{    
    return await this.storage.get(Storage_Key);
  }

  public addSavingsData(newSaving: Saving)
  {
    return this.getSavingsData().then((results: Saving[]) => {
      if(results)
      {
        results.push(newSaving);
        return this.storage.set(Storage_Key, results);
      }
      else
      {
        return this.storage.set(Storage_Key, [newSaving]);
      }
    });    
  }

  public async removeSaving(savingId: string){
    return this.getSavingsData().then((results: Saving[])  => {     
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Saving[] = [];
      for(let result of results){
        if(result.id !== savingId){
          newItems.push(result);
        }
      }

      return this.storage.set(Storage_Key, newItems);   
    });
  }      

  public async updateSaving(saving: Saving)
  {
    return this.getSavingsData().then((results: Saving[]) => {
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Saving[] = [];

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

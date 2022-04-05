import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const Storage_Key = 'passphrase';

export interface Passphrase{
  id: string,
  passphraseTitle: string,
  passphraseName: string,
  passphraseText: string    
}

@Injectable()
export class PassphraseStorageService {
  
  constructor(private storage: Storage){                
  }

  public async getPassphraseData(): Promise<Passphrase[]>{         
    return await this.storage.get(Storage_Key);
  }

  public addPassphrase(passPhrase: Passphrase)
  {     
    return this.getPassphraseData().then((results: Passphrase[]) => {
      if(results)
      {                    
        results.push(passPhrase);
        return this.storage.set(Storage_Key, results);
      }
      else
      {                      
        return this.storage.set(Storage_Key, [passPhrase]);
      }
    });    
  }

  public async removePassphrasetData(passPhrase: Passphrase){
    return this.getPassphraseData().then((results: Passphrase[])  => {        
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Passphrase[] = [];      
      for(let result of results){
        if(result.id !== passPhrase.id){
          newItems.push(result);      
        }
      }                       
      this.storage.set(Storage_Key, newItems);
    });    
  }      

  public async updatePassphraseData(passPhrase: Passphrase)
  {
    return this.getPassphraseData().then((results: Passphrase[]) => {
      if(!results || results.length == 0){
        return null;
      }

      // Remove and create new file       
      let newItems: Passphrase[] = [];

      for(let result of results){
        if(result.id == passPhrase.id){
          newItems.push(passPhrase);          
        }
        else{
          newItems.push(result);
        }
      }
      return this.storage.set(Storage_Key, newItems);
    });
  }
}
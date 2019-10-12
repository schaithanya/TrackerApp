import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const Storage_Key = 'expenses';

export interface Expense{
  id: string,
  type : string,
  amount: any,
  createdDate: number
}

@Injectable()
export class ExpenseStorageService {
  constructor(private storage: Storage){            
  }

  public async getExpenses(): Promise<Expense[]>{    
    return await this.storage.get(Storage_Key);
  }

  public addExpense(newExpense: Expense)
  {
    return this.getExpenses().then((results: Expense[]) => {
      if(results)
      {
        results.push(newExpense);
        return this.storage.set(Storage_Key, results);
      }
      else
      {
        return this.storage.set(Storage_Key, [newExpense]);
      }
    });    
  }

  public async removeExpense(expenseId: string){
    return this.getExpenses().then((results: Expense[])  => {     
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Expense[] = [];
      for(let result of results){
        if(result.id !== expenseId){
          newItems.push(result);
        }
      }

      return this.storage.set(Storage_Key, newItems);   
    });
  }      

  public async updateItem(expense: Expense)
  {
    return this.getExpenses().then((results: Expense[]) => {
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Expense[] = [];

      for(let result of results){
        if(result.id == expense.id){
          newItems.push(expense);          
        }
        else{
          newItems.push(result);
        }
      }
      return this.storage.set(Storage_Key, newItems);
    });
  }
}
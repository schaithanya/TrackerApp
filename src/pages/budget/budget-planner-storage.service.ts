import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const Storage_Key = 'budgetPlanner';

export interface Expense {
  id: string,
  expenseName: string,
  expenseDate: Date,
  createdDate: string,
  amount: number,
  expenseType: string,
  comments: string
}

export enum ExpenseTypes {
  Electricity = 0,
  Water = 1,
  LifeInsurance = 2,
  HouseTax = 3,
  Broadband = 4,
  Recharge = 5,
  LPG = 6,
  Shopping = 7,
  Travel = 8,
  Others = 9
}

export const expenseIcon = {
  'Electricity': 'ion-power',
  'Water': 'ion-power',
  'LifeInsurance': 'ion-power',
  'HouseTax': 'ion-power',
  'Broadband': 'ion-power',
  'Recharge': 'ion-power',
  'LPG': 'ion-power',
  'Shopping': 'ion-power',
  'Travel': 'ion-power',
  'Others': 'ion-power'
};

@Injectable()
export class BudgetPlannerStorageService {
  constructor(private storage: Storage) {
  }

  public async getExpenses(): Promise<Expense[]> {
    return await this.storage.get(Storage_Key);
  }

  public addExpense(newExpense: Expense) {
    return this.getExpenses().then((results: Expense[]) => {
      if (results) {
        results.push(newExpense);
        return this.storage.set(Storage_Key, results);
      }
      else {
        return this.storage.set(Storage_Key, [newExpense]);
      }
    });
  }

  public async removeExpense(expenseId: string) {
    return this.getExpenses().then((results: Expense[]) => {
      if (!results || results.length == 0) {
        return null;
      }

      let newItems: Expense[] = [];
      for (let result of results) {
        if (result.id !== expenseId) {
          newItems.push(result);
        }
      }

      return this.storage.set(Storage_Key, newItems);
    });
  }

  public async updateExpense(expense: Expense) {
    return this.getExpenses().then((results: Expense[]) => {
      if (!results || results.length == 0) {
        return null;
      }

      let newItems: Expense[] = [];

      for (let result of results) {
        if (result.id == expense.id) {
          newItems.push(expense);
        }
        else {
          newItems.push(result);
        }
      }
      return this.storage.set(Storage_Key, newItems);
    });
  }
}
import { Component, Input } from '@angular/core';
import { Saving } from '../../savings-storage.service';

export interface SavingResult {
  Index: number;
  SavingName: string;
  TotalAmount: number;
  TotalMatVal: number;
  TotalIntVal: number;
}

@Component({
  selector: 'savings-results',
  templateUrl: 'savings-result.component.html',
  styles: ['* {box-sizing:border-box} /* Next & previous buttons */ .prev, .next { cursor: pointer; position: absolute;top: 50%;width: auto;margin-top: -32px; padding-left: 0px; padding-top: 0px; padding-right: 16px; padding-bottom: 16px; color: rgb(72, 138, 255);font-weight: bold;font-size: 30px;transition: 0.6s ease;border-radius: 0 3px 3px 0; }  /* Position the "next button" to the right */ .next { right: 0; border-radius: 3px 0 0 3px; }  .active, .dot:hover { background-color: #717171; } .bold{font-weight: bold !important} .text-align-left{text-align:left; padding-right: 10px}']
})

export class SavingsResult {
  @Input() savings: Saving[];
  savingResults: SavingResult[] = [];
  name = 'Angular';
  slideIndex: number = 0;
  saving: SavingResult;
  constructor() {
    this.data();
    this.currentSlide(this.slideIndex);
  }

  nextSlide(index: number) {
    this.slideIndex = index >= this.savingResults.length - 1 ? 0 : this.slideIndex + 1;
    this.currentSlide(this.slideIndex);
  }

  prevSlide(index: number) {
    this.slideIndex = index <= 0 ? this.savingResults.length - 1 : this.slideIndex - 1;
    this.currentSlide(this.slideIndex);
  }
  currentSlide(index: number) {
    this.slideIndex = index;
    this.saving = this.savingResults[this.slideIndex];
  }

  ngOnChanges() {
    if (this.savings) {
      this.data();
      this.currentSlide(this.slideIndex);
    }
  }

  data() {
    let saving1: SavingResult;
    let savingsData = this.savings;
    saving1 = {
      Index: 0,
      SavingName: 'ALL',
      TotalAmount: savingsData ? savingsData.reduce((sum, current) => sum + (+current.amount || 0), 0) : 0,
      TotalMatVal: savingsData ? savingsData.reduce((sum, current) => sum + (+current.matAmount || 0), 0) : 0,
      TotalIntVal: savingsData ? savingsData.reduce((sum, current) => sum + (+current.interest || 0), 0) : 0
    };
    let saving2: SavingResult;
    saving2 = {
      Index: 1,
      SavingName: 'FD',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'FD').reduce((sum, current) => sum + (+current.amount || 0), 0) : 0,
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'FD').reduce((sum, current) => sum + (+current.matAmount || 0), 0) : 0,
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'FD').reduce((sum, current) => sum + (+current.interest || 0), 0) : 0
    };
    let saving3: SavingResult;
    saving3 = {
      Index: 2,
      SavingName: 'PPF',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'PPF').reduce((sum, current) => sum + (+current.amount || 0), 0) : 0,
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'PPF').reduce((sum, current) => sum + (+current.matAmount || 0), 0) : 0,
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'PPF').reduce((sum, current) => sum + (+current.interest || 0), 0) : 0
    };
    let saving4: SavingResult;
    saving4 = {
      Index: 3,
      SavingName: 'MF',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'MF').reduce((sum, current) => sum + (+current.amount || 0), 0) : 0,
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'MF').reduce((sum, current) => sum + (+current.matAmount || 0), 0) : 0,
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'MF').reduce((sum, current) => sum + (+current.interest || 0), 0) : 0
    };
    let saving5: SavingResult;
    saving5 = {
      Index: 4,
      SavingName: 'Insurance',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'Insurance').reduce((sum, current) => sum + (+current.amount || 0), 0) : 0,
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'Insurance').reduce((sum, current) => sum + (+current.matAmount || 0), 0) : 0,
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'Insurance').reduce((sum, current) => sum + (+current.interest || 0), 0) : 0
    };
    this.savingResults = [];
    this.savingResults.push(saving1)
    this.savingResults.push(saving2);
    this.savingResults.push(saving3);
    this.savingResults.push(saving4);
    this.savingResults.push(saving5);
  }
}


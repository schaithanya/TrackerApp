import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Saving } from '../../savings-storage.service';

export interface SavingResult {
  Index: number;
  SavingName: string;
  TotalAmount: string;
  TotalMatVal: string;
  TotalIntVal: string;
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

  @Output() dataEvent = new EventEmitter<string>();

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
    this.dataEvent.emit(this.saving.SavingName);
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
      TotalAmount: savingsData ? savingsData.reduce((sum, current) => sum + (+current.amount || 0), 0).toFixed(2) : '0',
      TotalMatVal: savingsData ? savingsData.reduce((sum, current) => sum + (+current.matAmount || 0), 0).toFixed(2) : '0',
      TotalIntVal: savingsData ? savingsData.reduce((sum, current) => sum + (+current.interest || 0), 0).toFixed(2) : '0'
    };
    let saving2: SavingResult;
    saving2 = {
      Index: 1,
      SavingName: 'FD',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'FD').reduce((sum, current) => sum + (+current.amount || 0), 0).toFixed(2) : '0',
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'FD').reduce((sum, current) => sum + (+current.matAmount || 0), 0).toFixed(2) : '0',
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'FD').reduce((sum, current) => sum + (+current.interest || 0), 0).toFixed(2) : '0'
    };
    let saving3: SavingResult;
    saving3 = {
      Index: 2,
      SavingName: 'PPF',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'PPF').reduce((sum, current) => sum + (+current.amount || 0), 0).toFixed(2) : '0',
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'PPF').reduce((sum, current) => sum + (+current.matAmount || 0), 0).toFixed(2) : '0',
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'PPF').reduce((sum, current) => sum + (+current.interest || 0), 0).toFixed(2) : '0'
    };
    let saving4: SavingResult;
    saving4 = {
      Index: 3,
      SavingName: 'MF',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'MF').reduce((sum, current) => sum + (+current.amount || 0), 0).toFixed(2) : '0',
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'MF').reduce((sum, current) => sum + (+current.matAmount || 0), 0).toFixed(2) : '0',
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'MF').reduce((sum, current) => sum + (+current.interest || 0), 0).toFixed(2) : '0'
    };
    let saving5: SavingResult;
    saving5 = {
      Index: 4,
      SavingName: 'Insurance',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'Insurance').reduce((sum, current) => sum + (+current.amount || 0), 0).toFixed(2) : '0',
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'Insurance').reduce((sum, current) => sum + (+current.matAmount || 0), 0).toFixed(2) : '0',
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'Insurance').reduce((sum, current) => sum + (+current.interest || 0), 0).toFixed(2) : '0'
    };
    let saving6: SavingResult;
    saving6 = {
      Index: 5,
      SavingName: 'NPS',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'NPS').reduce((sum, current) => sum + (+current.amount || 0), 0).toFixed(2) : '0',
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'NPS').reduce((sum, current) => sum + (+current.matAmount || 0), 0).toFixed(2) : '0',
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'NPS').reduce((sum, current) => sum + (+current.interest || 0), 0).toFixed(2) : '0'
    };
    let saving7: SavingResult;
    saving7 = {
      Index: 6,
      SavingName: 'CASH',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'CASH').reduce((sum, current) => sum + (+current.amount || 0), 0).toFixed(2) : '0',
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'CASH').reduce((sum, current) => sum + (+current.matAmount || 0), 0).toFixed(2) : '0',
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'CASH').reduce((sum, current) => sum + (+current.interest || 0), 0).toFixed(2) : '0'
    };
    let saving8: SavingResult;
    saving8 = {
      Index: 7,
      SavingName: 'PF',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'PF').reduce((sum, current) => sum + (+current.amount || 0), 0).toFixed(2) : '0',
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'PF').reduce((sum, current) => sum + (+current.matAmount || 0), 0).toFixed(2) : '0',
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'PF').reduce((sum, current) => sum + (+current.interest || 0), 0).toFixed(2) : '0'
    };
    let saving9: SavingResult;
    saving9 = {
      Index: 8,
      SavingName: 'CRYPTOS',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'CRYPTOS').reduce((sum, current) => sum + (+current.amount || 0), 0).toFixed(2) : '0',
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'CRYPTOS').reduce((sum, current) => sum + (+current.matAmount || 0), 0).toFixed(2) : '0',
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'CRYPTOS').reduce((sum, current) => sum + (+current.interest || 0), 0).toFixed(2) : '0'
    };
    let saving10: SavingResult;
    saving10 = {
      Index: 9,
      SavingName: 'OTHERS',
      TotalAmount: savingsData ? savingsData.filter((item: Saving) => item.type == 'OTHERS').reduce((sum, current) => sum + (+current.amount || 0), 0).toFixed(2) : '0',
      TotalMatVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'OTHERS').reduce((sum, current) => sum + (+current.matAmount || 0), 0).toFixed(2) : '0',
      TotalIntVal: savingsData ? savingsData.filter((item: Saving) => item.type == 'OTHERS').reduce((sum, current) => sum + (+current.interest || 0), 0).toFixed(2) : '0'
    };
    this.savingResults = [];
    this.savingResults.push(saving1)
    this.savingResults.push(saving2);
    this.savingResults.push(saving3);
    this.savingResults.push(saving4);
    this.savingResults.push(saving5);
    this.savingResults.push(saving6);
    this.savingResults.push(saving7);
    this.savingResults.push(saving8);
    this.savingResults.push(saving9);
    this.savingResults.push(saving10);
  }
}


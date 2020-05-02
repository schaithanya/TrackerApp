import { Component } from '@angular/core';

export interface SavingResult
{
  Index: number;
  SavingName: string;
  TotalAmount: number;
  TotalMatVal: number;
  TotalIntVal: number;
}

@Component({  
  selector:'savings-results',
  templateUrl: 'savings-result.component.html',
  styles: ['* {box-sizing:border-box} /* Next & previous buttons */ .prev, .next { cursor: pointer; position: absolute;top: 50%;width: auto;margin-top: -32px; padding-left: 0px; padding-top: 0px; padding-right: 16px; padding-bottom: 16px; color: rgb(72, 138, 255);font-weight: bold;font-size: 30px;transition: 0.6s ease;border-radius: 0 3px 3px 0; }  /* Position the "next button" to the right */ .next { right: 0; border-radius: 3px 0 0 3px; }  .active, .dot:hover { background-color: #717171; } .bold{font-weight: bold !important} .text-align-left{text-align:left; padding-right: 10px}']
})

export class SavingsResult {    
  savings: SavingResult[] = [];
  name = 'Angular';
  slideIndex: number = 0;
  saving: SavingResult;
  constructor()
  {
    this.data();
    this.currentSlide(this.slideIndex);
  }

  nextSlide(index: number)
  {
    this.slideIndex = index >= this.savings.length - 1 ? 0 : this.slideIndex + 1;
    this.currentSlide(this.slideIndex);
  }

  prevSlide(index: number)
  {
    this.slideIndex = index <= 0? this.savings.length - 1 : this.slideIndex - 1;
    this.currentSlide(this.slideIndex);
  }
  currentSlide(index:number)
  {
    this.slideIndex = index;
    this.saving = this.savings[this.slideIndex];
  } 
  data()
  {
    let saving1: SavingResult;
    saving1 = {
        Index: 0,
        SavingName: 'ALL',
        TotalAmount: 1000000,
        TotalMatVal: 1110000,
        TotalIntVal: 110000
    };
    let saving2: SavingResult;
    saving2 = {
        Index: 1,
        SavingName: 'FD',
        TotalAmount: 2000000,
        TotalMatVal: 2110000,
        TotalIntVal: 112000
    };
    let saving3: SavingResult;
    saving3 = {
      Index: 2,
      SavingName: 'PPF',
      TotalAmount: 5550000,
      TotalMatVal: 5510000,
      TotalIntVal: 110000
    };
    let saving4: SavingResult;
    saving4 = {
      Index: 3,
      SavingName: 'MF',
      TotalAmount: 5550000,
      TotalMatVal: 5510000,
      TotalIntVal: 110000
    };
    let saving5: SavingResult;
    saving5 = {
      Index: 4,
      SavingName: 'Insurance',
      TotalAmount: 5550000,
      TotalMatVal: 5510000,
      TotalIntVal: 110000
    };
    this.savings.push(saving1)
    this.savings.push(saving2);
    this.savings.push(saving3);
    this.savings.push(saving4);
    this.savings.push(saving5);
    console.log(this.savings)
  }
}


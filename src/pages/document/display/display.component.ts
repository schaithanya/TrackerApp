import { Component, OnInit } from '@angular/core';
import{ IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Document} from '../../document/document-storage.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit {
  documentData: Document = this.navParams.get('documentData');  
  url: any = '';

  constructor(public navParams: NavParams, private plt: Platform) {        
    this.plt.ready().then(() => {
      this.loadItems();
    });
   }

  loadItems(){
    var reader = new FileReader();
    reader.readAsDataURL(this.documentData.documentPath); // read file as data url
    reader.onload = (event) => { 
      let target: any = event.target; //<-- This (any) will tell compiler to shut up!
      this.url = target.result;
    }
  }  
  
  ngOnInit() {
  }

}
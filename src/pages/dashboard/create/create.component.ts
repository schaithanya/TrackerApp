import { Component, OnInit, ElementRef  } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardStorageService, Post} from '../../dashboard/dashboard-storage.service';
import {DashboardComponent} from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',    
  providers:[ DashboardStorageService ]   
})

export class CreateComponent implements OnInit {     
  url: any = '';

  post: Post = <Post>{};
  constructor(private dashboardService: DashboardStorageService, public navCtrl: NavController, public navParams: NavParams) { }

  ngOnInit() {
  }

 private savePostData(){          
    this.post.id = "Post" + Date.now();             
    this.dashboardService.addPost(this.post).then(item => {      
      this.navCtrl.push(DashboardComponent);
    });
  }    
  onSelectFile(event) {    
    this.post.postPath = event.target.files[0];    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        let target: any = event.target; 
        this.url = target.result
      }
    }
  }


}
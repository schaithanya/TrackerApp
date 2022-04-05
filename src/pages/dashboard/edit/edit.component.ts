import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardStorageService, Post } from '../../dashboard/dashboard-storage.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [DashboardStorageService]
})
export class EditComponent implements OnInit {
  post: Post = this.navParams.get('post');
  postUrl: any;

  constructor(private dashboardService: DashboardStorageService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        let target: any = event.target;
        this.postUrl = target.result
      }
    }
  }

  getFileUrl(file: File) {
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is complete      
        let target: any = event.target;
        this.postUrl = target.result
      }
    }
    return this.postUrl;
  }

  private updatePost() {
    this.dashboardService.updatePostData(this.post).then(item => {
      this.navCtrl.push(DashboardComponent);
    });
  }
}
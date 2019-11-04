import { Component, OnInit, ElementRef  } from '@angular/core';
import{ normalizeURL, NavController, NavParams } from 'ionic-angular';
import { DashboardStorageService, Post} from '../../dashboard/dashboard-storage.service';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import { DateService } from '../../../utilities/date.service';
import {FileInfo} from '../../../utilities/file.service';
import { FileService } from '../../../utilities/file.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',    
  providers:[ DashboardStorageService, FileService]   
})

export class CreateComponent implements OnInit {     
  fileInfo: FileInfo = <FileInfo>{};
  url: any = '';

  post: Post = <Post>{};
  constructor(private dashboardService: DashboardStorageService, public navCtrl: NavController, public navParams: NavParams,
    private dateService: DateService, private fileService: FileService){      
      this.fileInfo.fileUrl = '';
    }

  ngOnInit() {
  }

 private savePostData(){          
    this.post.id = "Post" + Date.now();
    this.post.postedDate = this.dateService.getTodaysDate();
    this.post.fileType = this.fileInfo.fileType;
    this.post.fileExt = this.fileInfo.fileExt;
    this.fileInfo.fileName = this.post.id;
                     
    this.dashboardService.addPost(this.post, this.fileInfo).then(item => {      
      this.navCtrl.push(DashboardComponent);
    });
  }    
  
  onSelectFile(){
    this.fileInfo = this.fileService.chooseFile();
  }

  getFileUrl(filePath){
    let imagePath = normalizeURL(filePath);
    return imagePath;
  }
}
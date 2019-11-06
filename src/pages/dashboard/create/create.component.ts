import { Component, OnInit, ElementRef  } from '@angular/core';
import{ normalizeURL, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DashboardStorageService, Post} from '../../dashboard/dashboard-storage.service';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import { DateService } from '../../../utilities/date.service';
import { FileInfo } from '../../../utilities/file.service';
import { FileService } from '../../../utilities/file.service';
import { CameraService } from '../../../utilities/camera.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',    
  providers:[ DashboardStorageService, FileService, CameraService]   
})

export class CreateComponent implements OnInit {     
  fileInfo: FileInfo = <FileInfo>{};
  myPhoto: any;
  myImage: any;

  post: Post = <Post>{};
  constructor(private dashboardService: DashboardStorageService, public navCtrl: NavController, public navParams: NavParams,
    private dateService: DateService, private fileService: FileService, public actionSheetController: ActionSheetController, private cameraService: CameraService){      
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
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Take Image',
        role: 'destructive',
        icon: 'camera',
        handler: () => {
          this.cameraService.takePhoto();
          this.myPhoto = this.cameraService.myPhoto;
          this.myImage = this.cameraService.myImageData;
        }
      }, {
        text: 'Select from Gallery',
        icon: 'images',
        handler: () => {
          this.cameraService.selectFromGallery();
          this.myPhoto = this.cameraService.myPhoto;
          this.myImage = this.cameraService.myImageData;
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }
}
import { Component, OnInit } from '@angular/core';
import{ normalizeURL, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DashboardStorageService, Post} from '../../dashboard/dashboard-storage.service';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import { DateService } from '../../../utilities/date.service';
import { FileInfo } from '../../../utilities/file.service';
import { FileService } from '../../../utilities/file.service';
import { CameraService } from '../../../utilities/camera.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';

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
    private dateService: DateService, private fileService: FileService, public actionSheetController: ActionSheetController, private cameraService: CameraService,
    private webView: WebView, private camera: Camera, private sanitizer: DomSanitizer){      
      this.fileInfo.fileUrl = '';
    }

  ngOnInit() {
  }

 private savePostData(){          
    this.post.id = "Post" + Date.now();
    this.post.postedDate = this.dateService.getTodaysDate();
    this.fileInfo.fileName = this.post.id;
                     
    this.dashboardService.addPost(this.post).then(item => {      
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
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.camera.getPicture(options).then((imageData) => {
            this.post.imageData = imageData;
            this.myPhoto = this.webView.convertFileSrc(imageData);            
            this.post.imageDisplay = this.myPhoto;
          })
        }
      }, {
        text: 'Select from Gallery',
        icon: 'images',
        handler: () => {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          
          this.camera.getPicture(options).then((imageData) => {
            this.post.imageData = imageData;
            this.myPhoto = this.webView.convertFileSrc(imageData);            
            this.post.imageDisplay = this.myPhoto;
          }, (err) => {
          });
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
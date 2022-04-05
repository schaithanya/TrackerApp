import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActionSheetController, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { CameraService } from '../../../utilities/camera.service';
import { FileInfo, FileService } from '../../../utilities/file.service';
import { DashboardStorageService, Post } from '../../dashboard/dashboard-storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers: [DashboardStorageService, FileService, CameraService]
})

export class CreateComponent implements OnInit {
  fileInfo: FileInfo = <FileInfo>{};
  myPhoto: any;
  myImage: any;

  post: Post = <Post>{};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fileService: FileService, public actionSheetController: ActionSheetController, private webView: WebView, private camera: Camera) {
    this.fileInfo.fileUrl = '';
  }

  ngOnInit() {
  }

  onSelectFile() {
    this.fileInfo = this.fileService.chooseFile();
  }

  getFileUrl(filePath) {
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
            destinationType: this.camera.DestinationType.FILE_URI,
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
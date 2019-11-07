import {Injectable} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class CameraService
{
    public myPhoto:any;
    public myImageData:any;
    constructor(private camera: Camera, private webview: WebView, private sanitizer: DomSanitizer){

    }
    
    public async takePhoto(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          
          this.myPhoto =  await this.camera.getPicture(options)
    }

    public getImageUrlByFileName(filePath: any){
        const resolvedImg = this.webview.convertFileSrc(filePath);
        const safeImg = this.sanitizer.bypassSecurityTrustUrl(resolvedImg);
        return safeImg;
    }

    public getImageUrlByFileContent(fileData: any){
        const tempFileName = fileData.substr(fileData.lastIndexOf('/') + 1);
        const tempBaseFilesystemPath = fileData.substr(0, fileData.lastIndexOf('/') + 1);
        this.getImageUrlByFileName(tempBaseFilesystemPath + tempFileName);
    }

    public selectFromGallery(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          
          this.camera.getPicture(options).then((imageData) => {
           // imageData is either a base64 encoded string or a file URI
           // If it's base64 (DATA_URL):
           this.myPhoto = 'data:image/jpeg;base64,' + imageData;
           this.myImageData = imageData;
          }, (err) => {
           // Handle error
          });
    }
}

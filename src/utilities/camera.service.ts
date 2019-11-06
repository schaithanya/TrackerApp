import {Injectable} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable()
export class CameraService
{
    public myPhoto:any;
    public myImageData:any;
    constructor(private camera: Camera){

    }
    
    public takePhoto(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
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

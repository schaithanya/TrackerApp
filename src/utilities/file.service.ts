import { Injectable } from "@angular/core";
import { File } from "@ionic-native/file/ngx";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

@Injectable()
export class FileService{  
  url: any;
  fileTransfer: FileTransferObject;
  storagePath: string = this.file.externalDataDirectory + "TrackerApp";
  
  constructor(private fileOpener: FileOpener, private transfer: FileTransfer, private file: File) {     
  }

  public createAppDirectory() {  
    this.file.createDir(this.file.externalDataDirectory , 'TrackerApp', false);  
  }

  public createFile(file: any, fileName: any, fileExtension: any){    
    if (file) {
      let filesrc = this.getFileUrl(file);      
      console.log(filesrc);
      this.fileTransfer.download(filesrc, this.storagePath + fileName + fileExtension);
    }              
  }

  public downloadFile(fileName: any, fileExtension: any){    
    this.fileTransfer.download(this.storagePath + fileName, this.file.applicationStorageDirectory + '/Download/' + fileName + fileExtension);
  }

  public viewFile(fileName: any, fileExtension: any){
    if(fileName){      
      this.fileTransfer.download(this.storagePath, this.file.dataDirectory + fileName + fileExtension).then(entry => {        
        this.fileOpener.open(this.storagePath + fileName + fileExtension, "application/pdf");        
      })
    }
  }

  public getFileUrl(file: any){        
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        let target: any = event.target; 
        this.url = target.result
      }
    }
    return this.url;
  }
}
import { Injectable } from "@angular/core";
import { File, FileEntry, IFile } from "@ionic-native/file/ngx";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

export interface FileInfo
{
  fileUrl: string,
  fileName: string,
  fileType: string
}

@Injectable()
export class FileService{  
  storagePath: string = this.file.externalDataDirectory + "/TrackerApp/";
  
  constructor(private fileOpener: FileOpener, private transfer: FileTransfer, private file: File) {     
  }

  public SaveFile(fileInfo: FileInfo){
    alert("Url" + fileInfo.fileUrl);
    alert("fileName" + fileInfo.fileName);
    alert('file Type' + fileInfo.fileType);
    this.checkFileType(fileInfo.fileUrl);
    let filePath: string = this.storagePath + fileInfo.fileName + ".pdf";
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(fileInfo.fileUrl, filePath).then((entry) => {
      alert('download complete: ' + entry.toURL());
      return entry.toURL();
    }, (error) => {
      alert('download failed!!');
      return "";
    });
  }

  checkFileType(url: string)
  {
    this.file.resolveLocalFilesystemUrl(url)
      .then((entry: FileEntry) => {
        return new Promise((resolve, reject) => {
          entry.file(meta => resolve(meta), error => reject(error));
        });
      })
      .then((meta: IFile) => {
        alert('MimeType' + meta.type);
      });
  }
  
  getFileType(fileType: string){
    if(fileType == 'pdf')
    {
      return '.pdf';
    }
    else if(fileType == 'png')
    {
      return '.png';
    }
    else if(fileType == 'jpeg')
    {
      return '.jpg';
    }
    else if(fileType == 'docx')
    {
      return '.docx'
    }
    
  }
  public createAppDirectory() {  
    this.file.createDir(this.file.externalDataDirectory , 'TrackerApp', false);  
  }
}
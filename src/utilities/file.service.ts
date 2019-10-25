import { Injectable } from "@angular/core";
import { File, FileEntry, IFile } from "@ionic-native/file/ngx";
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
var mime = require('mime-types');

export interface FileInfo
{
  fileUrl: string,
  fileName: string,
  fileType: string,
  fileExt: string
}

@Injectable()
export class FileService{  
  storagePath: string = this.file.externalDataDirectory + "/TrackerApp/";
  fileInfo: FileInfo = <FileInfo>{};
  fileType: string;
  fileType1: string;
  fileType2: string;
  fileType3: string;
  fileType4: string;

  
  constructor(private fileOpener: FileOpener, private transfer: FileTransfer, private file: File, private fileChooser: FileChooser) {     
  }

  public chooseFile() {
    this.fileChooser.open().then(url =>
    {
      this.fileInfo.fileUrl = url;
      this.file.resolveLocalFilesystemUrl(url).then(fileInfo =>
      {
          let files = fileInfo as FileEntry;
          files.file(success =>
            {
              this.fileInfo.fileType  = success.type;
              this.fileInfo.fileExt = mime.extension(success.type);
            });
      },err =>
      {
        console.log(err);
            throw err;
        });
      },err =>
      {
          console.log(err);
          throw err;
      });

    return this.fileInfo;
  }
  public SaveFile(fileInfo: FileInfo){
    let filePath: string = this.storagePath + fileInfo.fileName + "." + fileInfo.fileExt;
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(fileInfo.fileUrl, filePath).then((entry) => {
    }, (error) => {
      alert('download failed!!');
    });

    return filePath;
  }

  public openFile(filePath: string, fileType: string)
  {
    this.fileOpener.showOpenWithDialog(filePath, fileType)
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
  }

  public createAppDirectory() {  
    this.file.createDir(this.file.externalDataDirectory , 'TrackerApp', false);  
    this.file.createDir(this.file.externalDataDirectory + '/TrackerApp', 'Documents', false);  
    this.file.createDir(this.file.externalDataDirectory + '/TrackerApp', 'Savings', false);  
    this.file.createDir(this.file.externalDataDirectory + '/TrackerApp', 'Posts', false);  
  }
}

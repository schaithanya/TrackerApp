import { Injectable } from "@angular/core";
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { File, FileEntry } from "@ionic-native/file/ngx";
import { mime } from 'mime-types';

export interface FileInfo {
  fileUrl: string,
  fileName: string,
  fileType: string,
  fileExt: string,
  moduleName: string
}

@Injectable()
export class FileService {
  storagePath: string = this.file.externalDataDirectory + "/TrackerApp/";
  fileInfo: FileInfo = <FileInfo>{};
  moduleFolderName: string;

  constructor(private fileOpener: FileOpener, private transfer: FileTransfer, private file: File, private fileChooser: FileChooser) {
  }

  public chooseFile() {
    this.fileChooser.open().then(url => {
      this.fileInfo.fileUrl = url;
      this.file.resolveLocalFilesystemUrl(url).then(fileInfo => {
        let files = fileInfo as FileEntry;
        files.file(success => {
          this.fileInfo.fileType = success.type;
          this.fileInfo.fileExt = mime.extension(success.type);
        });
      }, err => {
        console.log(err);
        throw err;
      });
    }, err => {
      console.log(err);
      throw err;
    });

    return this.fileInfo;
  }
  public saveFile(fileInfo: FileInfo) {
    this.getFolder(fileInfo.moduleName);
    let filePath: string = this.storagePath + this.moduleFolderName + fileInfo.fileName + "." + fileInfo.fileExt;
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(fileInfo.fileUrl, filePath).then((entry) => {
    }, (error) => {
      alert('download failed!!');
    });

    return filePath;
  }

  public downloadFile(fileName: string) {
    let sourcePath: string = this.storagePath;
    let targetPath: string = this.file.documentsDirectory;
    this.file.copyFile(sourcePath, fileName, targetPath, fileName);
  }

  public openFile(filePath: string, fileType: string) {
    this.fileOpener.showOpenWithDialog(filePath, fileType)
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));
  }

  public removeFile(fileName: string) {
    this.file.removeFile(this.storagePath, fileName);
  }

  public copyFile(sourcePath: any, sourceFileName: any) {
    this.file.copyFile(sourcePath, sourceFileName, this.storagePath, sourceFileName);
  }

  public saveImageFile(tempImage: any) {
    const tempFileName = tempImage.substr(tempImage.lastIndexOf('/') + 1);
    const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);

    this.copyFile(tempBaseFilesystemPath, tempFileName)
  }

  public createAppDirectory() {
    this.file.createDir(this.file.externalDataDirectory, 'TrackerApp', false);
    this.file.createDir(this.file.externalDataDirectory + '/TrackerApp', 'Documents', false);
    this.file.createDir(this.file.externalDataDirectory + '/TrackerApp', 'Savings', false);
    this.file.createDir(this.file.externalDataDirectory + '/TrackerApp', 'Posts', false);
  }

  getFolder(moduleName: any) {
    if (moduleName == "Savings") {
      this.moduleFolderName = "Savings/";
    }
    else if (moduleName == "Documents") {
      this.moduleFolderName = "Documents/";
    }
    else if (moduleName == "Posts") {
      this.moduleFolderName = "Posts/";
    }
  }

}

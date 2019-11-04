import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FileService, FileInfo } from '../../utilities/file.service';

const Storage_Key = 'posts';

export interface Post{
  id: string,
  postTitle: string,
  postComments: string,
  postPath: any,
  postedDate: string,
  fileType: string,
  fileExt: string
}

@Injectable()
export class DashboardStorageService{
constructor(private storage: Storage, private fileService: FileService){            
  }

  public async getPostData(): Promise<Post[]>{      
    return await this.storage.get(Storage_Key);
  }

  public addPost(post: Post, fileInfo: FileInfo)
  {         
    return this.getPostData().then((results: Post[]) => {
    if(results)
    {          
      let result = this.fileService.SaveFile(fileInfo);
      post.postPath = result;                
      results.push(post);      
      return this.storage.set(Storage_Key, results);
    }
    else
    {              
      let result = this.fileService.SaveFile(fileInfo);
      post.postPath = result;                
      return this.storage.set(Storage_Key, [post]);
    }
    });    
  }

  public async removePostData(postId: string){
    return this.getPostData().then((results: Post[])  => {        
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Post[] = [];      
      for(let result of results){
        if(result.id !== postId){
          newItems.push(result);      
        }
      }                   
      this.storage.set(Storage_Key, newItems);
    });    
  }      

  public async updatePostData(post: Post)
  {
    return this.getPostData().then((results: Post[]) => {
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Post[] = [];

      for(let result of results){
        if(result.id == post.id){
          newItems.push(post);          
        }
        else{
          newItems.push(result);
        }
      }
      return this.storage.set(Storage_Key, newItems);
    });
  }
}
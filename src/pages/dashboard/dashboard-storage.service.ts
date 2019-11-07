import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const Storage_Key = 'posts';

export interface Post{
  id: string,
  imageData: any,
  postTitle: string,
  postComments: string,
  postedDate: string,
  imageDisplay: any
}

@Injectable()
export class DashboardStorageService{
constructor(private storage: Storage){            
  }

  public async getPostData(): Promise<Post[]>{      
    return await this.storage.get(Storage_Key);
  }

  public addPost(post: Post)
  {         
    return this.getPostData().then((results: Post[]) => {
    if(results)
    {          
      results.push(post);      
      return this.storage.set(Storage_Key, results);
    }
    else
    {              
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
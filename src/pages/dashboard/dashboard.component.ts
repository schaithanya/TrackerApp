import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, normalizeURL, Platform } from 'ionic-angular';
import { FileService } from '../../utilities/file.service';
import { CreateComponent } from '../dashboard/create/create.component';
import { DashboardStorageService, Post } from '../dashboard/dashboard-storage.service';
import { EditComponent } from '../dashboard/edit/edit.component';
const Storage_Key = 'posts';

@Component({
  selector: 'dashboard.component',
  templateUrl: 'dashboard.component.html',
  styles:['ion-avatar { background-color: AntiqueWhite; border-radius: 50%;  border: 2px solid; top: 0;  left: 0;  width: 46px;  height: 46px; z-index: 9; box-sizing: border-box; display: flex; align-items: center; justify-content: center; } .icobutton{ width: 5em }'], 
  providers:[DashboardStorageService]
})
export class DashboardComponent {
  posts: Post[] = [];
  post: Post = <Post>{}; 
  postUrl: any;     
  
  constructor(private dashboardService: DashboardStorageService, private plt: Platform,
              public navCtrl: NavController, private storage: Storage, private fileService: FileService) {
    
   this.plt.ready().then(() => {      
      this.loadItems();
    });
  }

  loadItems(){
    this.dashboardService.getPostData().then(posts => {    
      if (posts != null)      
      {                        
        this.posts = posts.reverse();      
      }      
    });    
  } 
  
  deletePost(post: Post){         
      this.storage.get(Storage_Key).then(results => {
          this.fileService.removeFile(post.id);
          let resultValues = [];
            for(let result of results){
              if(result.id !== post.id){
                resultValues.push(result);
          }
        }
          
        this.storage.set(Storage_Key, resultValues);
        this.posts = resultValues;
        this.reload(); 
    });
  }

  editPost(post: Post){
    this.post = post;    
    this.navCtrl.push(EditComponent, {post : this.post});
  }

  downloadPost(){

  }
  
  getFileUrl(filePath){
    let imagePath = normalizeURL(filePath);    
    return imagePath;
  }

  reload() {    
    let active = this.navCtrl.getActive(); 
    this.navCtrl.remove(active.index);
    this.navCtrl.push(active.component);
  }
  
  createPost(){
    this.navCtrl.push(CreateComponent);
  }  

  getFormattedDate(date: string){
    var dateValue = new Date(date);
    return dateValue.toDateString();
  }
}

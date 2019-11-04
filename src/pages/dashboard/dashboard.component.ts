import { Component } from '@angular/core';
import { NavController, normalizeURL , Platform  } from 'ionic-angular';
import { CreateComponent } from '../dashboard/create/create.component';
import { EditComponent } from '../dashboard/edit/edit.component';
import { DashboardStorageService, Post} from '../dashboard/dashboard-storage.service';

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
  
  constructor(private dashboardService: DashboardStorageService, private plt: Platform, public navCtrl: NavController) {
    
   this.plt.ready().then(() => {      
      this.loadItems();
    });
  }

  loadItems(){
    this.dashboardService.getPostData().then(posts => {    
      if (posts != null)      
      {                        
        this.posts = posts;      
      }      
    });    
  } 
  
  deletePost(post: Post){         
     this.dashboardService.removePostData(post.id);
     this.reload();   
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

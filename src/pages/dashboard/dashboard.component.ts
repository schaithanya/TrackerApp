import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform  } from 'ionic-angular';
import { CreateComponent } from '../dashboard/create/create.component';
import { EditComponent } from '../dashboard/edit/edit.component';
import { DashboardStorageService, Post} from '../dashboard/dashboard-storage.service';

@Component({
  selector: 'dashboard.component',
  templateUrl: 'dashboard.component.html',
  styles:['img{display: block; margin-left: auto; margin-right: auto; width: 20em; height: 20em;}'],
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

  reload() {    
    let active = this.navCtrl.getActive(); 
    this.navCtrl.remove(active.index);
    this.navCtrl.push(active.component);
  }
  
  createPost(){
    this.navCtrl.push(CreateComponent);
  }  

   getFileUrl(file: File) {        
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is complete      
        let target: any = event.target; 
        this.postUrl = target.result
      }
    }
    return this.postUrl;
  }

// async createActions() {
//     const actionSheet = await this.actionSheetController.create({
//       header: 'Albums',
//       buttons: [{
//         text: 'Delete',
//         role: 'destructive',
//         icon: 'trash',
//         handler: () => {
//           console.log('Delete clicked');
//         }
//       }, {
//         text: 'Share',
//         icon: 'share',
//         handler: () => {
//           console.log('Share clicked');
//         }
//       }, {
//         text: 'Play (open modal)',
//         icon: 'arrow-dropright-circle',
//         handler: () => {
//           console.log('Play clicked');
//         }
//       }, {
//         text: 'Favorite',
//         icon: 'heart',
//         handler: () => {
//           console.log('Favorite clicked');
//         }
//       }, {
//         text: 'Cancel',
//         icon: 'close',
//         role: 'cancel',
//         handler: () => {
//           console.log('Cancel clicked');
//         }
//       }]
//     });
//     await actionSheet.present();  
//   }
}

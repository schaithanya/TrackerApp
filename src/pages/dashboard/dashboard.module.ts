import { NgModule} from '@angular/core';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import {  IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MatCardModule } from '@angular/material';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CameraService } from '../../utilities/camera.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@NgModule({
declarations: [DashboardComponent, CreateComponent, EditComponent],
 imports: [
    CommonModule,
    MatCardModule,    
    IonicModule
  ],
  exports: [
    DashboardComponent,
    CreateComponent,
    EditComponent
  ],
entryComponents: [
    DashboardComponent,
    CreateComponent,
    EditComponent
  ],
  providers:[
    CameraService,
    WebView
  ]
})

export class DashboardModule{
  
  
  
}
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { IonicModule } from 'ionic-angular';
import { CameraService } from '../../utilities/camera.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

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
  providers: [
    CameraService,
    WebView
  ]
})

export class DashboardModule {



}
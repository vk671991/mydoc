import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CategoryPage } from './category/category.page';
import { ServiceProvider } from '../../providers/app.service';
import { DocListPage } from './doclist/doclist.page';
import { TitleListPage } from './titlelist/titlelist.page';

import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { ViewDocPage } from '../modals/viewdoc/viewdoc.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    RouterModule.forChild([
      //{
        //path: '',
        //component: CategoryPage
      //},
       {
        path: '',
        component: TitleListPage
      },
      {
        path: 'doclist/:catId/:eventId',
        component: DocListPage
      }
    ])
  ],
  declarations: [CategoryPage,DocListPage,ViewDocPage,TitleListPage],
  providers: [ ServiceProvider ,
    Camera,
    File,
    WebView,
    FilePath,
    SocialSharing,
    PhotoViewer
  ],
  entryComponents: [ ViewDocPage ]
})
export class GalleryPageModule {}

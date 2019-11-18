import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TitleListPage } from './titlelist/titlelist.page';
import { CategoryPage } from './category/category.page';
import { ServiceProvider } from '../../providers/app.service';
import { LanguagePage } from '../modals/language/language.page';
import { ChooseImagePage } from './chooseimage/chooseimage.page';
import { DrDetailPage } from './drdetail/drdetail.page';
import { PreviewPage } from './preview/preview.page';
import { ImageviewPage } from './imageview/imageview.page';

import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: CategoryPage
      },
      {
        path: 'titlelist/:catId',
        component: TitleListPage
      },
      {
        path: 'chooseimage',
        component: ChooseImagePage
      },
      {
        path: 'drdetail',
        component: DrDetailPage
      },
      {
        path: 'preview',
        component: PreviewPage
      },
	  {
        path: 'sampleview/:eventid/:categoryid',
        component: ImageviewPage
      }
    ])
  ],
  declarations: [	CategoryPage,
					TitleListPage,
					LanguagePage,
					ChooseImagePage,
					DrDetailPage,
					PreviewPage,
					ImageviewPage],
  entryComponents : [LanguagePage],
  providers: [ ServiceProvider ,
    Camera,
    File,
    WebView,
    FilePath
  ]
})
export class HomePageModule {}

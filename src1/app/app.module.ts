import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxUiLoaderModule,NgxUiLoaderRouterModule, NgxUiLoaderHttpModule,NgxUiLoaderConfig  } from 'ngx-ui-loader';
import { Interceptor } from './interceptor';
import { AuthServiceProvider } from '../providers/auth-service';
import { HttpModule } from '@angular/http';

import { PdfViewerModule } from 'ng2-pdf-viewer';

//import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
const NgxLoaderConfig: NgxUiLoaderConfig = {    
    fgsColor: '#ffffff00',
    fgsPosition: 'bottom-center',
    fgsSize: 2,
    fgsType: 'square-jelly-box',
    pbDirection: 'ltr',
    pbThickness: 3, // progress bar thickness,
    pbColor:'#06377c',
    logoUrl: "/assets/images/flexiloans-loader.gif",
    logoPosition: "center-center",
    text:"",
    textColor:"#800020",
    overlayColor:"#ffff"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(NgxLoaderConfig),
 //   NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxUiLoaderRouterModule,
	HttpClientModule,
	HttpModule,
  PdfViewerModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
	{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	AuthServiceProvider,
  //PhotoViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

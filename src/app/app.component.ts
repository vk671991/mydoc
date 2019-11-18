import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform ,ToastController, AlertController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { AuthServiceProvider } from '../providers/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Gallery',
      url: '/gallery',
      icon: 'images'
    },
    {
      title: 'How It Works ?',
      url: '/howitwork',
      icon: 'list'
    }
  ];
  public counter=0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ngxService: NgxUiLoaderService,
	private auth: AuthServiceProvider,
  private router: Router,
  public toastController: ToastController,
  public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByName('white');
     // this.ngxService.start();
     if(localStorage.getItem('loggedUser')){
        this.router.navigate(['/home']);
    }
      setTimeout(() => {
          this.ngxService.stop();
      }, 5000);

    });
  }




  
  logout(){
	this.auth.logout().subscribe(allowed => {
		console.log(allowed);
		 this.router.navigate(['/']);
	},
	error => {});
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}

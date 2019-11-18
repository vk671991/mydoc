import { Component } from '@angular/core';
import { MenuController,AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose',
  templateUrl: 'choose.page.html',
  styleUrls: ['choose.page.scss'],
})
export class ChoosePage {

  constructor(private menu: MenuController,private platform: Platform,private router: Router,
  public alertController: AlertController) {
  		    this.menu.enable(false);
  }

  ionViewWillEnter(){
    this.backBtn();
    
  }



  backBtn(){
  console.log('back fun loadeddd in choose page');
  document.addEventListener("backbutton", this.backListener);
 
  }

  backListener=
  async () => {
  console.log(this.router);
     if (this.router.url=='/start') {
     console.log('alert start');
          const alert = await this.alertController.create({
            header: 'Close app?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel'
              }, {
                text: 'Close',
                handler: () => {
                  navigator['app'].exitApp();
                }
              }
            ]
          });

          await alert.present();
        }
  }

  ionViewWillLeave(){
    document.removeEventListener("backbutton", this.backListener);
  }
  }

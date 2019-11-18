import { Component, OnInit } from '@angular/core';
import { MenuController,AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-howitwork',
  templateUrl: 'howitwork.page.html',
  styleUrls: ['howitwork.page.scss']
})
export class HowitworkPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private menu: MenuController,private platform: Platform,private router: Router,
  public alertController: AlertController) {
     
  }

  ionViewWillEnter(){
    //this.backBtn();
  }

  ngOnInit() {
 
  }

  backBtn(){
  console.log('back fun loadeddd');
  document.addEventListener("backbutton", () => {
    this.router.navigate(['/home']);
  });
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  ionViewWillLeave(){
    document.removeEventListener("backbutton", () => {
    this.router.navigate(['/home']);
  });
  }
}

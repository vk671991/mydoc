import { Component,OnInit } from '@angular/core';
import { MenuController,ToastController,AlertController,NavController } from '@ionic/angular';
import { ServiceProvider } from '../../../providers/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
})
export class CategoryPage {
	categoryList:Array<any>=[];
  
  constructor(
				private menu: MenuController,
				private _service : ServiceProvider,
				public toastController: ToastController,
				private router: Router,
				public alertController: AlertController,private navCtrl: NavController) 
			{
				this.menu.enable(true);
				
			}

	ngOnInit() {
		
	}

	goBack() {
this.navCtrl.back();
}

	ionViewWillEnter(){
		this.loadCatgories();
		this.backBtn();
		
	}

	backBtn(){
  console.log('back fun loadeddd in category page');
  document.addEventListener("backbutton", this.backListener);
}

 backListener=
	async () => {
  console.log(this.router);
 console.log(this.navCtrl);
     if (this.router.url=='/home') {
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
        }else{
        this.goBack();
        }
  }

	
	loadCatgories(){
	this.categoryList=[];
		this._service.categoriesRequest().subscribe(
		  (data: any) => {
			  this.categoryList=data.lists;
			console.log(data.lists);
		  },
		  error => {
		
		  }
		);
	}

	openCatgeory(categoryid){
		this.router.navigate(['home/titlelist/'+categoryid]); 
	}

	ionViewWillLeave(){
		document.removeEventListener("backbutton", this.backListener);
	}
}

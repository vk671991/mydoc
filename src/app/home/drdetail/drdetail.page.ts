import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-drdetail',
  templateUrl: 'drdetail.page.html',
  styleUrls: ['drdetail.page.scss'],
})
export class DrDetailPage {
	detailinfo= { name: '', info: '' };
  	constructor(private router: Router,public toastController: ToastController) {}
 
  	

	proceed(){
		 this.router.navigate(['/home/preview']);  
	}
	async presentToast(msg) {
		const toast = await this.toastController.create({
		  message: msg,
		  duration: 2000
		});
		toast.present();
	  }
	submit(){
		if(this.detailinfo.name == ''){
			this.presentToast("Please enter your Doctor Details.");
			return false;
		  }
		sessionStorage.setItem('drdetail',JSON.stringify(this.detailinfo));
		this.proceed();
	}

}

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguagePage } from '../../modals/language/language.page';
import { Router } from '@angular/router';
import { ServiceProvider } from '../../../providers/app.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-imageview',
  templateUrl: 'imageview.page.html',
  styleUrls: ['imageview.page.scss'],
})
export class ImageviewPage {
	requestData:Array<any>=[];
	imageLanguage:string='english';
	eventsImage:Object={};
	eventImg:string=null;
  constructor(public modalController: ModalController,private router: Router,
	private _service:ServiceProvider) {
		this.eventImg= environment.eventsImage;
	}
  languageModal(){
  	this.presentModal();
  }

  ngOnInit(){
	this.requestData=this.router.routerState.snapshot.url.split('/');
	this.loadEventImage(this.requestData[3],this.requestData[4],this.imageLanguage);
  }

  loadEventImage(eventid,categoryid,language){
	this._service.getEventImage(eventid,categoryid,language).subscribe(
		(data: any) => {
			this.eventsImage=data.lists;
		  console.log(data.lists);
		},
		error => {
  
		 }
		);
  }

  	async presentModal() {
	  const modal = await this.modalController.create({
	    component: LanguagePage,
	    componentProps: {
	      'language': this.imageLanguage
	    }
	  });

	  modal.onDidDismiss()
	      .then((data) => {
		  console.log(data);
		  this.imageLanguage=data.data;
		  this.loadEventImage(this.requestData[3],this.requestData[4],data.data);
	  });
	  return await modal.present();
	}

	proceed(){
		let allData= {
			categoryid:this.requestData[4],
			eventid:this.requestData[3],
			language:this.imageLanguage
		}
		sessionStorage.setItem('userData',JSON.stringify(allData));
		this.router.navigate(['/home/chooseimage']);  
	}

}

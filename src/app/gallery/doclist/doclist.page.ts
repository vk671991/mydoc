import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewDocPage } from '../../modals/viewdoc/viewdoc.page';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ServiceProvider } from '../../../providers/app.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-doclist',
  templateUrl: 'doclist.page.html',
  styleUrls: ['doclist.page.scss'],
})
export class DocListPage {
recordArr:Array<any>=[];
eventImg:string;
	requestData:Array<any>=[];
  constructor(public modalController: ModalController,private router: Router,
  private socialSharing: SocialSharing,public _service:ServiceProvider,private photoViewer: PhotoViewer) {
  this.eventImg=environment.previewFile;
  }
  viewModal(data){
  let imgurl=this.eventImg+data;
  console.log(imgurl);
  this.photoViewer.show(imgurl);

//  	this.presentModal();
  }


  shareModal(imgshare){
  	//console.log(share);
  	 let imgurl=this.eventImg+imgshare;
  		this.socialSharing.share('Myco Doc', 'Share File', imgurl,'').then(() => {
		  // Success!
		}).catch(() => {
		  // Error!
		});
  }


   ngOnInit(){
	this.requestData=this.router.routerState.snapshot.url.split('/');
	this.loadRecords(this.requestData[3],this.requestData[4],null);
  }

  filterDoc(event){
  		this.loadRecords(this.requestData[3],this.requestData[4],event.target.value);
  }

  loadRecords(eventid,categoryid,filterval){
  let data = {
  category:categoryid,
  eventid:eventid,
  userid:localStorage.getItem('loggedUser'),
  filterval:filterval
  }
	this._service.getRecords(data).subscribe(
		(data: any) => {
		this.recordArr=data.data;
		},
		error => {
  
		 }
		);
  }


  	async presentModal() {
	  const modal = await this.modalController.create({
	    component: ViewDocPage,
	    componentProps: {
	      'url': 'Douglas'
	    }
	  });

	  modal.onDidDismiss()
	      .then((data) => {
	      console.log(data);
	  });
	  return await modal.present();
	}

}

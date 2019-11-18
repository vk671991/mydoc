import { Component } from '@angular/core';
import { ServiceProvider } from '../../../providers/app.service';
import { Router } from '@angular/router';
import { Platform,ToastController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-preview',
  templateUrl: 'preview.page.html',
  styleUrls: ['preview.page.scss'],
})
export class PreviewPage {
  previewFile:string=null;
  eventImg:string=null;
  src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  constructor(private _service:ServiceProvider,private router:Router,public sanitizer: DomSanitizer,
  public toastController: ToastController) {
        this.eventImg=environment.previewFile;
  }

  ngOnInit(){
    this.loadPreviewFromStorage()
  }

  pdfURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.previewFile);
  }

  handleLoad(obj) {
  setTimeout(()=>{
    //  document.getElementsByTagName('iframe')[0].style.height=document.body.scrollheight;
  },2000)
  
  }

  loadPreviewFromStorage(){
    let userImg = JSON.parse(sessionStorage.getItem('userImg'));
    let requestData= JSON.parse(sessionStorage.getItem('userData'));
    let drdata = JSON.parse(sessionStorage.getItem('drdetail'));
    const data ={
      requestData :requestData,
      drdata:drdata,
      userImg:userImg
    }
    this._service.getPreviewImage(data).subscribe(
		  (data: any) => {
      this.previewFile=this.eventImg+data.data;
		  },
		  error => {
		
		  }
		);
  }

  submitPreview(){
      let requestData= JSON.parse(sessionStorage.getItem('userData'));
      let drdata = JSON.parse(sessionStorage.getItem('drdetail'));
      
      var text = this.previewFile;
      let selectedpreview=text.split(/[\s/]+/).pop();
      const data ={
        categoryid :requestData.categoryid,
        eventid:requestData.eventid,
        language:requestData.language,
        drname:drdata.name,
        info:drdata.info,
        selectedpreview:selectedpreview,
        user_id:localStorage.getItem('loggedUser')
      }
      this._service.submitPreviewImage(data).subscribe(
        (data: any) => {
          this.presentToast(data.message);
          sessionStorage.clear();
          this.router.navigate(['/home']);  
        },
        error => {
          this.presentToast('Failed to submit try after some time');
        }
      );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}

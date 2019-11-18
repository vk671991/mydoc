import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
//import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
 
const STORAGE_KEY = 'my_images';
 
@Component({
  selector: 'app-chooseimage',
  templateUrl: 'chooseimage.page.html',
  styleUrls: ['chooseimage.page.scss'],
})
export class ChooseImagePage implements OnInit{
 
  images = [];
  public base64Image : string=null;
  constructor(private camera: Camera, private file: File, 
  //private http: HttpClient, 
  private webview: WebView,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private storage: Storage, private platform: Platform, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private filePath: FilePath,private router: Router) { }
 
  ngOnInit() {
  
  }
 
  
 
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
 
  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }
 
  	async selectImage() {
	    const actionSheet = await this.actionSheetController.create({
	        header: "Select Image source",
	        buttons: [{
	                text: 'Load from Library',
	                handler: () =>{
	                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
	                }
	            },
	            {
	                text: 'Use Camera',
	                handler: () => {
	                    this.takePicture(this.camera.PictureSourceType.CAMERA);
	                }
	            },
	            {
	                text: 'Cancel',
	                role: 'cancel'
	            }
	        ]
	    });
	    await actionSheet.present();
	}
	 
	takePicture(sourceType: PictureSourceType) {
	    // Create options for the Camera Dialog
	  var options = {
		allowEdit: true,
	  quality: 100,
	   targetWidth: 1200,
	  targetHeight: 1200,
	  sourceType: sourceType,
	  saveToPhotoAlbum: false,
	  correctOrientation: true,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE
	};
   
	// Get the data of an image
	this.camera.getPicture(options).then((imageData) => {
	  // Special handling for Android library
	  if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
				this.base64Image = "data:image/jpeg;base64," + imageData;
	  } else {
			   this.base64Image = "data:image/jpeg;base64," + imageData;
	  }
	}, (err) => {
	  this.presentToast('Error while selecting image.');
	});
	 
	}



	skip(){
		 this.router.navigate(['/home/drdetail']);  
	}

	proceed(){
		if(!this.base64Image){
			this.presentToast('Select Image else press Skip');
			return false;
		}
		sessionStorage.setItem('userImg',JSON.stringify(this.base64Image));
		this.skip();
	}
 
}
import { Component,OnInit  } from '@angular/core';
import { MenuController ,NavController, AlertController,ToastController } from '@ionic/angular';
import { AuthServiceProvider } from '../../../providers/auth-service';
import { Router } from '@angular/router';
import { ServiceProvider } from '../../../providers/app.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  registerCredentials = { employee_id: '', password1: '',password2:'',password3:'',password4:'' };
  constructor(
  		private menu: MenuController,
  		public nav: NavController,
    	private alertCtrl: AlertController,
    	private auth: AuthServiceProvider,
    	private router: Router,
		private _service : ServiceProvider,
		public toastController: ToastController
    ) {
  		    this.menu.enable(false);
  }
  ngOnInit() {
   
  }

  passwordForgot(){
  console.log(this.registerCredentials.employee_id);
      if(this.registerCredentials.employee_id==''){
        this.presentToast('Enter Your Employee Id First !!');
      }
      this._service.forgotPassword(this.registerCredentials).subscribe(
      (data: any) => {
        this.presentToast(data.message);
      }
    );
    
  }

  inputInsideOtpInput(el) {
    console.log(el);
    // return false;
    if (el.value.length > 1){
        el.value = el.value[el.value.length - 1];
    }
    try {
        if(el.value == null || el.value == ""){
            this.foucusOnInput(el.previousElementSibling);
        }else {
            this.foucusOnInput(el.nextElementSibling);
        }
    }catch (e) {
        console.log(e);
    }
}

 foucusOnInput(ele){
   if(!ele){
     return false;
   }
   ele.focus();
   let val = ele.value;
   ele.value = "";
   // ele.value = val;
   setTimeout(()=>{
       ele.value = val;
   })
}


  gotoHome(){
        this.router.navigate(['/home']);  // define your component where you want to go
  }
  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public login() {
  // this.gotoHome();
	 // this._service.loginRequest(this.registerCredentials).subscribe(
      //(data: any) => {
		//  this.gotoHome();
      //},
      //error => {
		//this.presentToast('Enter Valid Credential');
     // }
    //);
    //return false;
    if(this.registerCredentials.employee_id=='' || this.registerCredentials.password1=='' ||this.registerCredentials.password2=='' ||this.registerCredentials.password3=='' ||this.registerCredentials.password4==''){
      this.presentToast("Please enter your credentials.");
      return false;
    }
    let requestData= {
      employee_id:this.registerCredentials.employee_id,
      password:this.registerCredentials.password1+this.registerCredentials.password2+this.registerCredentials.password3+this.registerCredentials.password4
    }
    this.auth.login(requestData).subscribe(allowed => {
		console.log(allowed);
      if (allowed) {
		    this.gotoHome();
      } else {
        this.presentToast("These credentials do not match our records.");
      }
    },
      error => {
       this.presentToast("These credentials do not match our records.");
      });
  }
  //moveFocus(event, nextElement, previousElement) {
     moveFocus(event,next,prev) {

      if(event.target.value.length < 1 && prev){
     prev.setFocus()
   }
   else if(next && event.target.value.length>0){
     next.setFocus();
   }
   else {
    return 0;
   } 
return false;
  /// if (previousElement) {
  //    previousElement.setFocus();
   // } else{
  //    if (nextElement) {
   //     nextElement.setFocus();
   //     }
   //   } 


  }

otpController(event,next,prev){
   if(event.target.value.length < 1 && prev){
     prev.setFocus()
   }
   else if(next && event.target.value.length>0){
     next.setFocus();
   }
   else {
    return 0;
   } 
}

  ngOnDestroy(){
    if(this.router.url=='/start/login'){
        this.router.navigate(['/start/login']); 
    };
  }

}

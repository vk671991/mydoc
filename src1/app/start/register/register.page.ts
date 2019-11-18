import { Component } from '@angular/core';
import { MenuController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceProvider } from '../../../providers/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {

step1:boolean=true;
step2:boolean=false;
step3:boolean=false;
step1Credentials = { employee_id: ''};
step2Credential = { email: '',phone :'' };
step3Credential : Array<any>=[];
otpid:string=null;
  constructor(
				private menu: MenuController,
				private router: Router,
				private auth: AuthServiceProvider,
				public toastController: ToastController) {
					this.menu.enable(false);
  }

  step1submit(){
    if(this.step1Credentials.employee_id == ''){
      this.presentToast("Please enter your Employee Id.");
    } 
	  this.auth.validateEmployeecode(this.step1Credentials).subscribe(allowed => {
		  if (allowed.status) {
        if (allowed.data.status==1) {
          this.presentToast("The Employee has already registered. Please login to the account.");
        }
        else if(allowed.data.status==2){
          this.presentToast("The Employee has been deactivated. Please contact admin.");
        }
        else if(allowed.data.status==0){
          this.step1 = false;
          this.step2 = true;
          this.step2Credential = { email : allowed.data?allowed.data.email:'', phone: allowed.data?allowed.data.phone:''}
          this.presentToast("Please verify your email and mobile number.");
        }
        else{
          this.presentToast("The Employee status is unknown. Please report the to admin.");
        }
      } else {
			this.presentToast("The Employee do not match our records.");
		  }
		},error => {
			this.presentToast("The Employee do not match our records.");
		});
  }
  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  step2submit(){
    let request ={
      email:this.step2Credential.email,
      phone:this.step2Credential.phone,
      employee_id:this.step1Credentials.employee_id
    }
	  this.auth.sendRegisterOtp(request).subscribe(allowed => {
		  if (allowed.status) {
			this.step2=false;
			this.step3=true;
      this.otpid=allowed.code;
      this.presentToast("We have sent Login PIN on your email. Please verify it.");
		  } else {
			this.presentToast("These credentials do not match our records.");
		  }
		},error => {
			this.presentToast("These credentials do not match our records.");
		});
		
  	
  }

  step3submit(){
  
    let request ={
      code:this.otpid,
      codeenter:this.step3Credential['otp1']+this.step3Credential['otp2']+this.step3Credential['otp3']+this.step3Credential['otp4'],
      employee_id:this.step1Credentials.employee_id
    }
    this.auth.submitOtp(request).subscribe(allowed => {

        this.register();
    },error => {
      this.presentToast("These credentials do not match our records.");
    });

  	
  }

  register(){
  	this.router.navigate(['/start/login']);
  }
  
  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }

  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drdetail',
  templateUrl: 'drdetail.page.html',
  styleUrls: ['drdetail.page.scss'],
})
export class DrDetailPage {
	detailinfo= { name: '', info: '' };
  	constructor(private router: Router) {}
 
  	

	proceed(){
		 this.router.navigate(['/home/preview']);  
	}

	submit(){
		sessionStorage.setItem('drdetail',JSON.stringify(this.detailinfo));
		this.proceed();
	}

}

import { Component,OnInit } from '@angular/core';
import { MenuController,ToastController } from '@ionic/angular';
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
				private router: Router) 
			{
				this.menu.enable(true);
			}

	ngOnInit() {
		this.loadCatgories();
	}
	
	loadCatgories(){
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
}

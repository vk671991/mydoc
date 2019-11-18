import { Component } from '@angular/core';
import { ServiceProvider } from '../../../providers/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titlelist-gallery',
  templateUrl: 'titlelist.page.html',
  styleUrls: ['titlelist.page.scss'],
})
export class TitleListPage {
  categoryid:string=null;
  eventList:Array<any>=[];
  constructor(private _service: ServiceProvider,
    private router: Router){

  }

  ngOnInit() {
    
   // this.categoryid=this.router.routerState.snapshot.url.split('/')[3];
    //this.loadEvents(this.categoryid);
    this.loadEvents();
  }
  
  loadEvents(){
      this._service.getList().subscribe(
      (data: any) => {
        this.eventList=data.lists;
      },
      error => {

       }
      );
  }

  

  

}

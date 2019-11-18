import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-choose',
  templateUrl: 'choose.page.html',
  styleUrls: ['choose.page.scss'],
})
export class ChoosePage {

  constructor(private menu: MenuController) {
  		    this.menu.enable(false);
  }

}

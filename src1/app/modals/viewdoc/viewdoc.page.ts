import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-viewdoc',
  templateUrl: 'viewdoc.page.html',
  styleUrls: ['viewdoc.page.scss'],
})
export class ViewDocPage {
language:string='';
 // Data passed in by componentProps
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor(navParams: NavParams,public modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('firstName'));
  }

  dismiss(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  submitLanguage(){
  	  this.modalController.dismiss(this.language);
  }

}

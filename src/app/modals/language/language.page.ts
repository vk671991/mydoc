import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-language',
  templateUrl: 'language.page.html',
  styleUrls: ['language.page.scss'],
})
export class LanguagePage {
language:string='';
 // Data passed in by componentProps
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor(navParams: NavParams,public modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
    this.language=navParams.get('language');
    console.log(navParams.get('language'));
  }

  dismiss(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(this.language);
  }
  
  submitLanguage(){
  	  this.modalController.dismiss(this.language);
  }

}

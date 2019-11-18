import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { keepFresh } from 'http-operators';
import { BaseProviderService } from './BaseProvider.service';
import { environment } from '../environments/environment';
@Injectable()
export class ServiceProvider extends BaseProviderService {
  
  constructor(public http: HttpClient) {
	  super(http);
  }

	loginRequest(requestbody){
		return this.makePostCall(environment.lumenApi+'login',requestbody);
	}

	categoriesRequest(){
		return this.makeGetCall(environment.lumenApi+'categories')
	}

	getListOfCategory(categoryid){
		return this.makeGetCall(environment.lumenApi+'lists/'+categoryid)
	}

	getList(){
		return this.makeGetCall(environment.lumenApi+'lists')
	}

	getEventImage(eventid,categoryid,language){
		return this.makeGetCall(environment.lumenApi+'list-image/'+eventid+'/'+categoryid+'/'+language);
	}

	getPreviewImage(requestbody){
		return this.makePostCall(environment.lumenApi+'generate-preview',requestbody);
	}

	submitPreviewImage(requestbody){
		return this.makePostCall(environment.lumenApi+'submit-preview',requestbody);
	}

	getRecords(requestbody){
		return this.makePostCall(environment.lumenApi+'user-record',requestbody);	
	}

	forgotPassword(requestbody){
		return this.makePostCall(environment.lumenApi+'forgot-password',requestbody);	
	}

}
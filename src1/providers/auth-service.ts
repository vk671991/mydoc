import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from '../environments/environment';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  
  // Change to this http://ed43bb3b.ngrok.io/api/login
  static readonly LOGIN_URL = 'https://jsonplaceholder.typicode.com/todos';
  // Change to this http://ed43bb3b.ngrok.io/api/register
  static readonly REGISTER_URL = 'http://contoh.dev/api/register';
  access: boolean;
  token: string;

  constructor(public http: Http) {}

  // Login
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials.");
    } else {
      return Observable.create(observer => {
        this.http.post(environment.lumenApi+'login', credentials)
        .pipe(map(res => res.json()))
        .subscribe( data => {
			console.log(data.api_token);
          if (data.api_token) {
			localStorage.setItem('api_token','Bearer ' + data.api_token);
      localStorage.setItem('loggedUser',data.employee_id);
			this.access = true;
          } else {
            this.access = false;
          }
		   observer.next(this.access);
		   setTimeout(() => {
              observer.complete();
          }, 1000);
        });

      }, err => console.error(err));
    }
  }

  // Register
  public register(credentials) {
    if (credentials.name === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {

        this.http.post(AuthServiceProvider.REGISTER_URL, credentials)
        .pipe(map(res => res.json()))
        .subscribe( data => {
          console.log(data);
        });

        observer.next(true);
        observer.complete();
      });
    }
  }
  
  public validateEmployeecode(credentials){
    if (credentials.employee_id === null) {
      return Observable.throw("Please insert credentials.");
    } else {
      return Observable.create(observer => {
        this.http.post(environment.lumenApi+'validate-employee-id', credentials)
        .pipe(map(res => res.json()))
        .subscribe( data => {
		   observer.next(data);
		   setTimeout(() => {
              observer.complete();
          }, 1000);
        },err=>{
			observer.next(false);
			observer.complete();
		});

      }, err => {
		  
		console.error(err)  
	  });
    }
  }
  
  public sendRegisterOtp(credentials){
    if (credentials.email === null) {
      return Observable.throw("Please insert credentials.");
    } else {
      return Observable.create(observer => {
        this.http.post(environment.lumenApi+'sendotp', credentials)
        .pipe(map(res => res.json()))
        .subscribe( data => {
		   observer.next(data);
		   setTimeout(() => {
              observer.complete();
          }, 1000);
        },err=>{
			observer.next(false);
			observer.complete();
		});

      }, err => {
		  
		console.error(err)  
	  });
    }
  }

  public submitOtp(credentials){
    if (credentials.codeenter === null || credentials.employee_id === null || credentials.code === null) {
      return Observable.throw("Please insert credentials.");
    } else {
      return Observable.create(observer => {
        this.http.post(environment.lumenApi+'verifyotp', credentials)
        .pipe(map(res => res.json()))
        .subscribe( data => {
       observer.next(data);
       setTimeout(() => {
              observer.complete();
          }, 1000);
        },err=>{
      observer.next(false);
      observer.complete();
    });

      }, err => {
      
    console.error(err)  
    });
    }
  }

  

  // Get Token
  public getToken() {
	  return localStorage.getItem('api_token');
  }

  // Logout
  public logout() {
    return Observable.create(observer => {
		localStorage.clear();
		observer.next(true);
		observer.complete();
    });
  }

}
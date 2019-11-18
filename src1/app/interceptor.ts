import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('/secure/')) {
        request = request.clone({
            reportProgress: true,
            setHeaders: {
                ['Authorization']: 'Bearer ' + sessionStorage.getItem('access_token')
            }
        });
    } else {
        request = request.clone({
            reportProgress: true
        });
    }
    return next.handle(request);
  }
}

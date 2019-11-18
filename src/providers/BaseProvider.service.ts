import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
// tslint:disable-next-line: import-blacklist
import { catchError } from 'rxjs/operators';
// tslint:disable-next-line: import-blacklist
import { map } from 'rxjs/operators';


@Injectable()
export class BaseProviderService {
    public headers = new HttpHeaders();
    public httpOptions = { headers: new HttpHeaders() };
    public http: HttpClient;
    public error: Error;
    public status: number;
    constructor(http: HttpClient) {
        this.http = <HttpClient>http;
        this.httpOptions.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    getHeaders(): HttpHeaders { // getting common headers for the REST call
        // this.addHeader('cache-control', 'no-cache');
        return this.httpOptions.headers;
    }
    addHeader(key: string, value: string) {
        // Add a particular Header for the REST call
        this.httpOptions.headers = this.httpOptions.headers.set(key, value);
        // this.httpOptions.headers = this.httpOptions.headers.delete('Content-Type');
    }
    getJSONfromModel(model) {
        // Converts an TO into string
        if (model) { return JSON.stringify(model); }
    }

    makePGCall(resourceURL: string, requestModel: any) {
        this.addHeader('Content-Type', 'application/x-www-form-urlencoded');
        this.addHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
        return this.http.post(resourceURL, requestModel.toString(), { headers: this.httpOptions.headers })
            .pipe(map(response => response), catchError(this.handleError));
    }
    /*
     Function for POST call
     Parameters:
     resourceURL: The resource on which POST call has to be made.
     requestModel: The Request model to be sent along with the call.
     Return Type: : Observable<{} | HttpResponse<Object>>
     */
    makePostCall(resourceURL: string, requestModel: any): Observable<{} | HttpResponse<Object>> {
        if (requestModel instanceof HttpParams) {
            requestModel = requestModel;
            this.httpOptions.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
          } else {
            requestModel = this.getJSONfromModel(requestModel);
          }
        return this.http.post(resourceURL, requestModel, { headers: this.httpOptions.headers })
            .pipe(map(response => response), catchError(this.handleError));
        // return this.http.post(resourceURL, this.getJSONfromModel(requestModel), this.getHeaders()).map(res => res);
    }
    /*
    Function for GET call
    Parameters:
    resourceURL: The resource on which POST call has to be made.
    Return Type: : Observable<{} | HttpResponse<Object>>
    */
    makeGetCall(resourceURL: string): Observable<{} | HttpResponse<Object>> {
        return this.http.get(resourceURL, { headers: this.getHeaders(), observe: 'body' })
            .pipe(map(response => response), catchError(this.handleError));
    }

    /*
  Function for PATCH call
  Parameters:
  resourceURL: The resource on which PATCH call has to be made.
  requestModel: The Request model to be sent along with the call.

  Return Type: Observable<T>
  */
    makePatchCall(resourceURL: string, requestModel: any) {
        return this.http.patch(resourceURL,
            this.getJSONfromModel(requestModel), { headers: this.getHeaders() })
            .pipe(map(response => response), catchError(this.handleError));
    }

    /*
  Function for PATCH call
  Parameters:
  resourceURL: The resource on which PATCH call has to be made.
  requestModel: The Request model to be sent along with the call.

  Return Type: Observable<T>
  */
    makePatchFullResponseCall(resourceURL: string, requestModel: any) {
        return this.http.patch(resourceURL,
            this.getJSONfromModel(requestModel), { headers: this.getHeaders(), observe: 'response' })
            .pipe(map(response => response), catchError(this.handleError));
    }

    /*
Function for PATCH call
Parameters:
resourceURL: The resource on which PATCH call has to be made.
requestModel: The Request model to be sent along with the call.

Return Type: Observable<T>
*/
    makePutCall(resourceURL: string, requestModel: any) {
        return this.http.put(resourceURL,
            this.getJSONfromModel(requestModel), { headers: this.getHeaders(), observe: 'body' })
            .pipe(map(response => response), catchError(this.handleError));
    }

    /*
    Function for Upload file call
    Parameters:
    resourceURL: The resource on which PATCH call has to be made.
    requestModel: The Request model to be sent along with the call.

    Return Type: Observable<T>
    */

    makeUploadCall(resourceURL: string, requestModel: FormData): Observable<{} | HttpResponse<Object>> {
        if (localStorage.getItem('X-AUTH-TOKEN')) {
            const HttpUploadOptions = {
                headers: new HttpHeaders({ 'Authorization': localStorage.getItem('X-AUTH-TOKEN') }),
            };
            return this.http.post(resourceURL, requestModel, HttpUploadOptions)
                .pipe(map(response => response), catchError(this.handleError));
        } else {
            return;
        }
    }

    /*
    Function for handling errors during an API call
    Parameters:
    error: Error Received on API call
    */
    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 500 || error.status === 503) {
            console.log('Something went wrong. Please try again!', 'Oppsss... Network Error!');
            return throwError(error);
        } else {
            if (error.error instanceof ErrorEvent) {
                return throwError(error);
            } else {
                return throwError(error.error);
            }
        }
    }
}

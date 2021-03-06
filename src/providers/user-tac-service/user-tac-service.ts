import { Injectable } from '@angular/core';
import { 
  HttpClient,
  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { ErrorHandlerProvider } from '../error-handler/error-handler';

export const STAGING_HOST = 'https://tacnote-staging.herokuapp.com/api/';
export const PROD_HOST = 'https://tacnote.herokuapp.com/api/';

export const PRODUCTION_CLIENT_ID = "d0HymwbuHmliXm0D3D0YiZGUI2Lcp9RdhX0WK2UQ";
export const STAGING_CLIENT_ID = "JD5F6RG8UHwYT30fWCWl5p0rUMhwYKRp697b9ZIR";

export const URL_USER_AUTHENTICATION = "auth/token/";
/*
  Generated class for the UserTacServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserTacServiceProvider {

  hostingType = "staging";

  constructor(
    public errorHandler: ErrorHandlerProvider,
    public http: HttpClient) {
    console.log('Hello UserTacServiceProvider Provider');
  }

  getBaseUrl(){
    return STAGING_HOST;
  }

  getClientID(){
    return STAGING_CLIENT_ID;
  }

  // #########################################
  // ########### Authentication  #############
  // #########################################

  public doLogin(authCreds): Observable<any> {

    let body = {
      username: authCreds.username,
      password: authCreds.password,
      grant_type: 'password',
      client_id: this.getClientID(),
      hw_id:'staff'
    }

    let url = this.getBaseUrl() + URL_USER_AUTHENTICATION;

    let sub = this.http.post(url, body).map( auth => {
      // this.authCredential.dataObject(auth);
        return auth;
    }).catch((error) => {
      // console.log("Error ",error);
      return this.errorHandler.handleError(error);
    });

    return sub;
  }

  public doLogout(authCreds): Observable<any>{

    let auth = authCreds;

    let body = {
      client_id: this.getClientID(),
      token: 'Bearer ' + auth.accessToken
    }

    let url = this.getBaseUrl() + 'auth/revoke-token/';

    let request = this.http.post(url, body).map( res => {
      return res;
    }).catch(error => {
      console.log("Error ",error);
      return this.errorHandler.handleError(error);
    });

    return request;
  }

  // #########################################
  // ########### User Profile  ###############
  // #########################################  

  public doGetProfileInfo(authCreds): Observable<any> {
    let auth = authCreds;
    let headers : HttpHeaders = new HttpHeaders({
      "Authorization": auth.tokenType + " " + auth.accessToken,
      "Content-Type": 'application/json',
    });

    let url = this.getBaseUrl() + 'me/';

    let request = this.http.get(url, {headers}).map( res => {
      return res;
    }).catch( error => {
      return this.errorHandler.handleError(error);
    });

    return request;
  }

  public doUpdateProfileInfo(authCreds, user): Observable<any> {
    let auth = authCreds;

    let headers : HttpHeaders = new HttpHeaders({
      "Authorization": auth.tokenType + " " + auth.accessToken,
      "Content-Type": 'application/json',
    });

    let body = {

    }

    let url = this.getBaseUrl() + 'me/';

    let request = this.http.post(url, body, {headers}).map( res => {
      return res;
    }).catch( error => {
      return this.errorHandler.handleError(error);
    });

    return request;
  }

  // #########################################
  // ############### Events  #################
  // #########################################

  public doGetOrganiseEventList(authCreds): Observable<any> {
    let auth = authCreds;

    let headers : HttpHeaders = new HttpHeaders({
      "Authorization": auth.tokenType + " " + auth.accessToken,
      "Content-Type": 'application/json',
    });

    let url = this.getBaseUrl() + 'events/all/';

    let request = this.http.get(url, {headers}).map( res => {
      return res;
    }).catch( error => {
      return this.errorHandler.handleError(error);
    });

    return request;
  }

  public doGetEventSelectedInfo(eventID, authCreds): Observable<any> {
    let auth = authCreds;

    let headers : HttpHeaders = new HttpHeaders({
      "Authorization": auth.tokenType + " " + auth.accessToken,
      "Content-Type": 'application/json',
    });

    let url = this.getBaseUrl() + "events/" + eventID + "/";

    let request = this.http.get(url, {headers}).map( res => {
      return res;
    }).catch( error => {
      return this.errorHandler.handleError(error);
    });

    return request;
  }

  public doGetEventStats(eventID, authCreds): Observable<any> {
    let auth = authCreds;

    let headers : HttpHeaders = new HttpHeaders({
      "Authorization": auth.tokenType + " " + auth.accessToken,
      "Content-Type": 'application/json',
    });

    let url = this.getBaseUrl() + "events/" + eventID + "/stats/";

    let request = this.http.get(url, {headers}).map( res => {
      return res;
    }).catch( error => {
      return this.errorHandler.handleError(error);
    });

    return request;
  }

  doGetSearchEventVisitors(eventID, queryText, authCreds): Observable<any> {
    let auth = authCreds;

    let headers : HttpHeaders = new HttpHeaders({
      "Authorization": auth.tokenType + " " + auth.accessToken,
      "Content-Type": 'application/json',
    });

    var urlParams = new URLSearchParams();
    urlParams.set("event_id", eventID);
    urlParams.set("fields", "email,id,user,first_name,last_name,name,last_checked_in,last_checked_out,group,tacn_no,remark,remark_json");
    urlParams.set("name", queryText);

    let url = this.getBaseUrl() + "admin/visitors/?" + urlParams;
    // console.log()
    let request = this.http.get(url, {headers}).map( res => {
      console.log(res);
      return res;
    }).catch( error => {
      return this.errorHandler.handleError(error);
    });

    return request;
  }

  // #DEPRECATED
  public doGetAttendedEvent(authCreds): Observable<any> {

    let auth = authCreds;

    let headers : HttpHeaders = new HttpHeaders({
      "Authorization": auth.tokenType + " " + auth.accessToken,
      "Content-Type": 'application/json',
    });

    let url = this.getBaseUrl() + 'me/attended-events/';

    let request = this.http.get(url, {headers}).map( res => {
      return res;
    }).catch( error => {
      return this.errorHandler.handleError(error);
    });

    return request;
  }
}

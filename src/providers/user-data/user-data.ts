import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {
  AuthCredential,} from '../../app/model/model';

const STORAGE_AUTHENTICATION_CREDS = "authenticationCredentials";
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {

  islogIn = false;
  authCred: AuthCredential;

  constructor(
    public storage: Storage,
    public modalCtrl: ModalController) {
    console.log('Hello UserDataProvider Provider');
    this.getAuthCredsLocally().then( auth => {

      if(auth){
        this.authCred = auth;
        this.islogIn = true;
      // console.log("Authentication Credentials", this.authCred);
      }
    })
  }


  //Authentication
  // 1. Save authentication
  // 2. GET Authentication
  // 3. Delete Authentication

  saveAuthCredsLocally(auth){
    var authCred = new AuthCredential();
    authCred.dataObject(auth);
    console.log("Save auth : ", authCred);
    this.storage.set(STORAGE_AUTHENTICATION_CREDS, authCred);
  }

  getAuthCredsLocally(): Promise<any>{
    return this.storage.get(STORAGE_AUTHENTICATION_CREDS);
  }

  deleteAuthCredsLocally(){
    this.storage.remove(STORAGE_AUTHENTICATION_CREDS);
  }

  isUserLogin(): Promise<any>{
    return new Promise<any>( isLogin => {
      this.getAuthCredsLocally().then( auth => {
        console.log(auth);
        if(auth){
          isLogin(true);
        }else{
          isLogin(false);
        }
      })
    })
  }
}

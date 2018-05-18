import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {
  AuthCredential,} from '../../app/model/model';
import { UserTacServiceProvider } from '../../providers/user-tac-service/user-tac-service';

const STORAGE_AUTHENTICATION_CREDS = "authenticationCredentials";
const STORAGE_USER_CREDS = "userCredentials"
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {

  constructor(
    public userTacService: UserTacServiceProvider,
    public storage: Storage,
    public modalCtrl: ModalController) {
    console.log('Hello UserDataProvider Provider');
  
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

  saveUserCredsLocally(userCreds){
    this.storage.set(STORAGE_USER_CREDS, userCreds);
  }

  getUserCredsLocally(): Promise<any>{
    return this.storage.get(STORAGE_USER_CREDS);
  }

  deleteUserCredsLocally(){
    this.storage.remove(STORAGE_USER_CREDS);
  }

  // #######################################
  // ########### Authentication ############
  // #######################################

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

  clearStorageAfterLogout(){
    this.storage.clear();
  }

  // #######################################
  // ########## Auth Tac Service ###########
  // #######################################

  userLogIn(userCreds){
    return new Promise<any>((resolve, reject) => {
      this.userTacService.doLogin(userCreds).subscribe( auth => {
        this.saveAuthCredsLocally(auth);
        this.saveUserCredsLocally(userCreds);
        resolve();
      }, err => {
        console.log("User data Managfer login : ", err);
        reject(err);
      });
    });
  }

  userLogOut(){
    return new Promise<any>((resolve, reject) => {
      this.getAuthCredsLocally().then( val => {
        let auth:AuthCredential = val;
        
        this.userTacService.doLogout(auth).subscribe( response => {
          this.clearStorageAfterLogout();
          resolve(response);
        }, err => {
          reject(err);
        });

      });
    });
  }
}

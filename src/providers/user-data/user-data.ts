import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {
  AuthCredential,
  Event,
  User} from '../../app/model/model';
import { UserTacServiceProvider } from '../../providers/user-tac-service/user-tac-service';

const STORAGE_AUTHENTICATION_CREDS = "authenticationCredentials";
const STORAGE_USER_CREDS = "userCredentials";
const STORAGE_USER_INFO = "userInfo";
const STORAGE_EVENT_LIST = "eventList";
const STORAGE_EVENT_INFO = "eventInfo";

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

  // #######################################
  // ############# Sync Data ###############
  // #######################################

  /**
   * Sync Data
   * 
   * After select event,
   * sync some of the data and persist it locally
   * 
   */

   syncData(){
    this.getUserProfileInfo();
   }

  // #######################################
  // ########## User Credential ############
  // #######################################

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

        // this.userTacService.doGetProfileInfo(auth).subscribe( res => {
        //   let user : User = new User();
        //   user.dataObject(res);
        //   console.log("USER : ", user);
        //   this.saveUserProfileInfoLocally(user);
        // });

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

  // #######################################
  // ############ User Profile #############
  // #######################################

  getUserProfileInfo(){
    return new Promise<any>((resolve, reject) => {
      this.getAuthCredsLocally().then( val => {
        // console.log("Profile info",val);
        if(val){
          let auth: AuthCredential = val;

          this.userTacService.doGetProfileInfo(auth).subscribe( res => {
            let user : User = new User();
            user.dataObject(res);
            console.log(user);
            this.saveUserProfileInfoLocally(user);
            
            resolve(user);
          }, err => {
            reject(err);
          })
        }
      });
    });
  }

  saveUserProfileInfoLocally(user: User){
    this.storage.set(STORAGE_USER_INFO, user);
  }

  getUserProfileInfoLocally(): Promise<any> {
    return this.storage.get(STORAGE_USER_INFO);
  }

  // #######################################
  // ############# Event Data ##############
  // #######################################

  isEventSelected() {
    return new Promise<any>( isSelected => {
      this.getEventInfoLocally().then( val => {
        if(val){
          isSelected(true);
        }else{
          isSelected(false);
        }
      });
    });
  }

  getEventList() {
    return new Promise<any>((resolve, reject) => {
      this.getAuthCredsLocally().then( val => {
        let auth: AuthCredential = val;

        this.userTacService.doGetAttendedEvent(auth).subscribe( res => {

          let data = res.data;

          console.log(data);
          this.saveEventListLocally(data);
          resolve(data);
        }, err => {
          reject(err);
        });
      })
    })
  }

  saveEventListLocally(data: Event[]){
    this.storage.set(STORAGE_EVENT_LIST, data);
  }

  getEventListLocally(): Promise<any>{
    return this.storage.get(STORAGE_EVENT_LIST);
  }

  getSelectedEventInfo(eventID){
    return new Promise<any>((resolve, reject) => {
      this.getAuthCredsLocally().then( val => {
        let auth: AuthCredential = val;
        console.log(auth, eventID);
        this.userTacService.doGetEventSelectedInfo(eventID, auth).subscribe( res => {
          let event: Event = new Event();
          event.dataObject(res);
          this.saveEventInfoLocally(event);
          resolve(event);
        }, err => {
          reject(err);
        });
      });
    });
  }

  saveEventInfoLocally(data){
    this.storage.set(STORAGE_EVENT_INFO, data);
  }

  getEventInfoLocally(): Promise<Event> {
    return this.storage.get(STORAGE_EVENT_INFO);
  }
}

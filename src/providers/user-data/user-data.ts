import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {
  AuthCredential,
  Event,
  User,
  EventStat,
  Visitor} from '../../app/model/model';
import { UserTacServiceProvider } from '../../providers/user-tac-service/user-tac-service';

const STORAGE_AUTHENTICATION_CREDS = "authenticationCredentials";
const STORAGE_USER_CREDS = "userCredentials";
const STORAGE_USER_INFO = "userInfo";
const STORAGE_EVENT_LIST = "eventList";
const STORAGE_EVENT_INFO = "eventInfo";
const STORAGE_EVENT_STAT = "eventStat";
const STORAGE_VISITOR_LIST = "visitorList";

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

        this.userTacService.doGetOrganiseEventList(auth).subscribe( res => {
          let data = res.data;

          var eventList: Event[] = [];

          for( var i = 0; i < data.length; i++){
            var temp: Event = new Event();
            temp.dataObject(data[i]);
            eventList.push(temp);
          }

          console.log(eventList);
          this.saveEventListLocally(eventList);
          resolve(eventList);
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
          this.saveSelectedEventInfoLocally(event);
          resolve(event);
        }, err => {
          reject(err);
        });
      });
    });
  }

  saveSelectedEventInfoLocally(data){
    this.storage.set(STORAGE_EVENT_INFO, data);
  }

  getEventInfoLocally(): Promise<Event> {
    return this.storage.get(STORAGE_EVENT_INFO);
  }

  getEventStatsInfo(eventID){
    return new Promise<any>((resolve, reject) => {
      this.getAuthCredsLocally().then( val => {
        let auth: AuthCredential = val;

        this.userTacService.doGetEventStats(eventID, auth).subscribe( res => {
          let eventStat: EventStat = new EventStat();
          eventStat.dataObject(res);
          this.saveEventStatInfoLocally(eventStat);
          resolve(eventStat);
        }, err => {
          reject(err);
        });
      });
    });
  }

  saveEventStatInfoLocally(data: EventStat){
    this.storage.set(STORAGE_EVENT_STAT, data);
  }

  getEventStatInfoLocally(){
    return this.storage.get(STORAGE_EVENT_STAT);
  }

  getSelectedEventVisitors(eventID, queryText){
    return new Promise<any>((resolve, reject) => {
      this.getAuthCredsLocally().then( val => {
        let auth: AuthCredential = val;

        this.userTacService.doGetSearchEventVisitors(eventID, queryText, auth).subscribe( res => {
          let data = res.data;

          var visitors: Visitor[] = [];

          for (var i=0; i < data.length; i++){
            let vis: Visitor = new Visitor();
            vis.dataObject(data[i]);

            visitors.push(vis);
          }

          // this.storage.set(STORAGE_VISITOR_LIST, visitors);
          console.log("Visitors : ", visitors);

          resolve(visitors);
        }, err => {
          reject(err);
        });
      });
    });
  }
}

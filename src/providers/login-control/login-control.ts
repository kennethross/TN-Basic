import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { UserDataProvider } from '../user-data/user-data';
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the LoginControlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginControlProvider {

  constructor(
    public modalCtrl: ModalController,
    public userData: UserDataProvider) {
    console.log('Hello LoginControlProvider Provider');
  }

  // checkUserHasLogin(): boolean{
    // return this.userData.isUserLogin();
  // }

  loginControl(): Promise<any> {
    return new Promise<any>( done => {
      this.userData.isUserLogin().then( isLogin => {
        if(isLogin){
          //no need to pop out
          done("Already Login");
        }else {
          this.showLogin().then( res => {
            done("Success login");
          })
        }
      })
    });
  }

  showLogin(){
    return new Promise<any>(resolve => {
      let loginModal = this.modalCtrl.create(LoginPage);
      loginModal.onDidDismiss(() => {
        resolve("Return from Login");
      });
      loginModal.present();
    });
  }

  // login(userCreds){
  //   return new Promise<any>((resolve, reject) => {
  //     this.userData.userLogIn(userCreds).then( res => {
  //       resolve(res);
  //     }, err => {
  //       reject(err);
  //     });
  //   });
  // }

  logout(){
    return new Promise<any>((resolve, reject) => {
      this.userData.userLogOut().then( () => {
        resolve();
      }, err => {
        reject(err);
      });
    });
  }
}

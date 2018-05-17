import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginControlProvider } from '../../providers/login-control/login-control';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { UserTacServiceProvider } from '../../providers/user-tac-service/user-tac-service';
import { SimpleAlertProvider } from '../../providers/simple-alert/simple-alert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public simpleAlert: SimpleAlertProvider,
    public userTacService: UserTacServiceProvider,
    public userData: UserDataProvider,
    public loginControl: LoginControlProvider,
    public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
    this.userLogin();
  }



  userLogin(){

    //go tell should show or not
    // return with auth or successful login in

    this.loginControl.loginControl().then( res => {
      console.log(res);
    });

    // if(!this.loginControl.checkUserHasLogin()){
    //   this.loginControl.showLogin().then( res => {
    //     console.log(res);
    //   });
    // }
  }

  logoutTapped(){
    this.logoutUser();
  }

  logoutUser(){
    this.simpleAlert.showLoadingWithMessage("");
    this.userData.userLogOut().then( res => {
      //successful
      //show the login
      this.simpleAlert.showSuccessWithMessage("Succesfully loggin out");
      this.loginControl.showLogin();
    },err => {
      this.simpleAlert.showErrorWithMessage("Error");
    });
  }

}

import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavParams,
  ViewController } from 'ionic-angular';

import { NgForm } from '@angular/forms/src/directives/ng_form';

import { SimpleAlertProvider } from '../../providers/simple-alert/simple-alert';
import { LoginControlProvider } from '../../providers/login-control/login-control';
import { UserDataProvider } from '../../providers/user-data/user-data';
// import { UserTacServiceProvider } from '../../providers/user-tac-service/user-tac-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userLogin = { username: 'chokkuan@gmail.com', password: '123456' };

  constructor(

    public simpleAlert: SimpleAlertProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public userData: UserDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginTapped(logForm: NgForm){
    console.log(logForm);
    if(logForm.valid){
      this.login();
    }
  }

  login(){
    this.simpleAlert.showLoadingWithMessage("");

    this.userData.userLogIn(this.userLogin).then( res => {
      this.simpleAlert.showSuccessWithMessage("Successfully");
      this.dismiss();
    }, err => {
      console.log(err);
      this.simpleAlert.showTitleWithMessage("Error : " + err.code, err.description );
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}

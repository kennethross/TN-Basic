import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavParams,
  ViewController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
// import { NgForm } from '@angular/forms/src/directives/ng_form';

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

  userLogin = { username: 'tacnotecrew@tacnote.com', password: '123456' };
  credentialsForm: FormGroup;
  // userLogin = { username: '', password: '' };

  constructor(
    private formBuilder: FormBuilder,
    public simpleAlert: SimpleAlertProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public userData: UserDataProvider) {

      this.credentialsForm = this.formBuilder.group({
        username:[this.userLogin.username, Validators.compose([
                   Validators.pattern(regexValidators.email),
                   Validators.required])],
        password:[this.userLogin.password, Validators.required],
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginTapped(logForm: FormGroup){
    // this.submitted = true;
    console.log(logForm);
    this.login();
  }

  login(){
    this.simpleAlert.showLoadingWithMessage("");

    let userLoginCreds = {
      username: this.credentialsForm.value.username,
      password: this.credentialsForm.value.password
    }

    this.userData.userLogIn(userLoginCreds).then( res => {
      this.simpleAlert.dismissLoading();
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

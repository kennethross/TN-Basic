import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams,
  ViewController } from 'ionic-angular';
import { SimpleAlertProvider } from '../../providers/simple-alert/simple-alert';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { UserTacServiceProvider } from '../../providers/user-tac-service/user-tac-service';

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

  userLogin = { username: 'chokkuan99@gmail.com', password: '123456' };

  constructor(
    public userData: UserDataProvider,
    public simpleAlert: SimpleAlertProvider,
    public userTacService: UserTacServiceProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginTapped(){
    this.login();
  }

  login(){
    this.simpleAlert.showLoadingWithMessage("");
    this.userTacService.doLogin(this.userLogin).subscribe( auth => {
      console.log(auth);
      //TODO
      // save the authToken in userData
      this.userData.saveAuthCredsLocally(auth);
      this.simpleAlert.showSuccessWithMessage("Success");
      this.dismiss();
    }, err => { 
      this.simpleAlert.showErrorWithMessage("error");
      console.log(err);
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}

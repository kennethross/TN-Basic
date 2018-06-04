import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../app/model/model';
/**
 * Generated class for the ProfileDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-detail',
  templateUrl: 'profile-detail.html',
})
export class ProfileDetailPage {

  user: User;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.user = new User();
    this.user = this.navParams.data.user;
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileDetailPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}

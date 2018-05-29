import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VisitorDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visitor-detail',
  templateUrl: 'visitor-detail.html',
})
export class VisitorDetailPage {

  checkIn: boolean=true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorDetailPage');
  }

  checkTapped(){
    this.checkIn = !this.checkIn;
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Visitor } from '../../app/model/model';

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
  visitor: Visitor;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.visitor = this.navParams.data.visitor;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorDetailPage');
  }

  checkTapped(){
    this.checkIn = !this.checkIn;
  }

}

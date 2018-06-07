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
      this.visitorCheckInOrCheckOut();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorDetailPage');
  }

  // #####################################
  // ######## Check in Functions #########
  // #####################################

  visitorCheckInOrCheckOut() {
    let checkInDate = this.visitor.lastCheckedIn;
    let checkOutDate = this.visitor.lastCheckedOut;

    console.log(checkInDate, checkOutDate);
    
    if(checkInDate === undefined){
      this.checkIn = true;
    } else if(checkInDate > checkOutDate){
      this.checkIn = false;
    }else {
      this.checkIn = true;
    }
  }

  checkTapped(){
    this.checkIn = !this.checkIn;
  }

}

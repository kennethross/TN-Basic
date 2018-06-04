import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { User, EventStat } from '../../app/model/model';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  eventStat: EventStat;

  constructor(
    public userData: UserDataProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.eventStat = new EventStat();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.getEventStatFromServer();
  }

  getEventStatFromServer(){
    this.userData.getEventInfoLocally().then( event => {
      let eventID = event.itemID;

      this.userData.getEventStatsInfo(eventID).then( res => {
        console.log(res);
        this.eventStat = res;
      }, err => {
        console.log(err);
      });
    })
  }

  getEventStatLocally(){
    this.userData.getEventStatInfoLocally().then( event => {
      this.eventStat = event;
    })
  }

}

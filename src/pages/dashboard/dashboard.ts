import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { User, EventStat } from '../../app/model/model';
import { SimpleAlertProvider } from '../../providers/simple-alert/simple-alert';

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
  visitorAttendedPercentage: any = 0;

  constructor(
    public simpleAlert: SimpleAlertProvider,
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
        this.calculateVisitorsAttendedPercentage();
      }, err => {
        console.log(err);
        this.simpleAlert.showErrorWithMessage(err.description);
      });
    })
  }

  getEventStatLocally(){
    this.userData.getEventStatInfoLocally().then( event => {
      this.eventStat = event;
      this.calculateVisitorsAttendedPercentage();
    })
  }

  calculateVisitorsAttendedPercentage(){
    let temp = (parseInt(this.eventStat.activeVisitors) / parseInt(this.eventStat.totalVisitors)) * 100;
    console.log(temp);
    this.visitorAttendedPercentage = temp.toFixed(2);
  }
}

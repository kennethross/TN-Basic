import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  ViewController } from 'ionic-angular';
import  {
  Event } from '../../app/model/model';
import { SimpleAlertProvider } from '../../providers/simple-alert/simple-alert';
import { UserDataProvider } from '../../providers/user-data/user-data';
/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  events: any[];

  constructor(
    public simpleAlert: SimpleAlertProvider,
    public userData: UserDataProvider,
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  
    this.getDataFromServer();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');

    this.userData.getEventListLocally().then( res => {
      this.events = res;
    });
  }

  itemSelected(event){

    // this.simpleAlert.showLoadingWithMessage("Retrieving Event Info..");

    this.userData.saveSelectedEventInfoLocally(event);
    this.dismiss();

    // this.getSelectedEventInfo(event).then( () => {
    //   this.simpleAlert.dismissLoading();
    //   this.dismiss();
    // }, err => {
    //   this.simpleAlert.showErrorWithMessage(err.description);
    //   this.simpleAlert.dismissLoading();
    // });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  getDataFromServer(){

    this.simpleAlert.showLoadingWithMessage("Fetching Data");
    this.userData.getEventList().then( res => {
      console.log(res);
      this.events = res;
      this.simpleAlert.dismissLoading();
    }, err => {
      console.log(err);
      this.simpleAlert.dismissLoading();
    });
  }

  getSelectedEventInfo(event){
    return new Promise<any>((resolve, reject) => {
      this.userData.getSelectedEventInfo(event.id).then( res => {
        console.log(res);
        resolve();
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  closeTapped() {
    console.log("Close tapped");
  }
}

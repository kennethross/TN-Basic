import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VisitorDetailPage } from '../visitor-detail/visitor-detail';
import { SimpleAlertProvider } from '../../providers/simple-alert/simple-alert';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Visitor, EventStat } from '../../app/model/model';

/**
 * Generated class for the VisitorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visitors',
  templateUrl: 'visitors.html',
})
export class VisitorsPage {

  isBlock: Boolean = false;
  queryText: string;
  visitors: Visitor[] = [];
  eventStat: EventStat;
  contacts;
  groupedContacts = [];

  constructor(
    public userData: UserDataProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public simpleAlert: SimpleAlertProvider) {
      this.eventStat = new EventStat();
  //   this.contacts = [
  //     'Kate Beckett',
  //     'Richard Castle',
  //     'Alexis Castle',
  //     'Lanie Parish',
  //     'Javier Esposito',
  //     'Kevin Ryan',
  //     'Martha Rodgers',
  //     'Roy Montgomery',
  //     'Jim Beckett',
  //     'Stana Katic',
  //     'Nathan Fillion',
  //     'Molly Quinn',
  //     'Tamala Jones',
  //     'Jon Huertas',
  //     'Seamus Dever',
  //     'Susan Sullivan'
  // ];

  //   this.groupContacts(this.contacts);

    // this.getVisitorsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorsPage');
    this.getEventStatLocally();
  }

  searchVisitors(){
    console.log(this.queryText);

    if(!this.isNullOrWhiteSpace(this.queryText)){
      this.simpleAlert.showLoadingWithMessage("");

      this.getVisitorsList(this.queryText).then( res => {
        this.visitors = res;
        this.simpleAlert.dismissLoading();
      }, err => {
        this.simpleAlert.showErrorWithMessage(err.description);
      });

    }
  }

  openPrintBadge(visitor){
    // console.log(contact);
    this.simpleAlert.showTitleWithMessage("Visitor", visitor.name);
  }

  openVisitorDetail(visitor){
    console.log(visitor);
    this.navCtrl.push(VisitorDetailPage,{visitor: visitor});
  }

  groupContacts(contacts){
 
    let sortedContacts = contacts.sort();
    let currentLetter = false;
    let currentContacts = [];

    sortedContacts.forEach((value, index) => {

        if(value.charAt(0) != currentLetter){

            currentLetter = value.charAt(0);

            let newGroup = {
                letter: currentLetter,
                contacts: []
            };

            currentContacts = newGroup.contacts;
            this.groupedContacts.push(newGroup);

        }

        currentContacts.push(value);

    });
  }

  // ######################################
  // ############### Data #################
  // ######################################

  getVisitorsList(queryText:string){
    return new Promise<any>((resolve, reject) => {
      this.userData.getEventInfoLocally().then( event => {
        let eventID = event.itemID;
  
        this.userData.getSelectedEventVisitors(eventID,queryText).then( res => {
         resolve(res);
        }, err => {
        reject(err);
        });
      });
    });
  }

  getEventStatLocally(){
    this.userData.getEventStatInfoLocally().then( event => {
      this.eventStat = event;
      console.log(this.eventStat);
    })
  }

  isNullOrWhiteSpace(str) {
    return (!str || str.length === 0 || /^\s*$/.test(str))
  }
}

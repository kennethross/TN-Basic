import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VisitorDetailPage } from '../visitor-detail/visitor-detail';
import { SimpleAlertProvider } from '../../providers/simple-alert/simple-alert';

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

  queryText: string;
  contacts;
  groupedContacts = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public simpleAlert: SimpleAlertProvider) {

    this.contacts = [
      'Kate Beckett',
      'Richard Castle',
      'Alexis Castle',
      'Lanie Parish',
      'Javier Esposito',
      'Kevin Ryan',
      'Martha Rodgers',
      'Roy Montgomery',
      'Jim Beckett',
      'Stana Katic',
      'Nathan Fillion',
      'Molly Quinn',
      'Tamala Jones',
      'Jon Huertas',
      'Seamus Dever',
      'Susan Sullivan'
  ];

  this.groupContacts(this.contacts);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorsPage');
  }

  searchVisitors(){
    console.log(this.queryText);
  }

  openPrintBadge(contact){
    // console.log(contact);
    this.simpleAlert.showTitleWithMessage("Visitor", contact);
  }

  openVisitorDetail(contact){
    console.log(contact);
    this.navCtrl.push(VisitorDetailPage);
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
}

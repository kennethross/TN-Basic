import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.events = [
      {
        imageUrl: './assets/imgs/eventimage.jpg',
        eventTitle: 'WeChatExpo',
        date: 'Feb 15 - 26, 2018'
      },
      {
        imageUrl: './assets/imgs/eventimage2.png',
        eventTitle: 'WeChatExpo',
        date: 'Feb 15 - 26, 2018'
      },
    ]
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }

}

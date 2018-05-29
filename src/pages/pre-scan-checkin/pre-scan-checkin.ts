import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SuccessCheckedinPage } from '../success-checkedin/success-checkedin';

/**
 * Generated class for the PreScanCheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pre-scan-checkin',
  templateUrl: 'pre-scan-checkin.html',
})
export class PreScanCheckinPage {

  constructor(
    public scanner: BarcodeScanner,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreScanCheckinPage');
  }

  openScanner(){

    this.navCtrl.push(SuccessCheckedinPage);
    // this.scanner.scan().then( data => {

    // }, err => {

    // });
  }

  backTapped() {
    this.navCtrl.popToRoot();
  }

}

import { Component } from '@angular/core';
import { RegistrationFormPage } from '../registration-form/registration-form';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Directive, ElementRef, Host, Renderer2} from '@angular/core';

import { EmailCheckinPage } from '../email-checkin/email-checkin';
import { PreScanCheckinPage } from '../pre-scan-checkin/pre-scan-checkin';

@Directive({
    selector: '[m-ripple-effect]',
    host: {
        'tappable': '',
        'role': 'button',
        'style': 'position: relative; overflow: hidden'
    }
})
export class RippleEffectDirective {
    constructor(@Host() host: ElementRef, renderer: Renderer2) {
        const div = renderer.createElement('div');
        renderer.addClass(div, 'button-effect');
        renderer.setStyle(div, "display", "block");
        renderer.appendChild(host.nativeElement, div);
    }
}

/**
 * Generated class for the KioskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kiosk',
  templateUrl: 'kiosk.html',
})
export class KioskPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KioskPage');
  }

  walkinTapped() {
    console.log("Walkin");
    this.navCtrl.push(RegistrationFormPage);
  }

  checkinTapped() {
    console.log("Check in");
    this.navCtrl.push(EmailCheckinPage);
  }

  qrCheckinTapped() {
    console.log("QR Checkin");
    this.navCtrl.push(PreScanCheckinPage);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';

import { PhoneCheckinPage } from '../phone-checkin/phone-checkin';
import { SuccessCheckedinPage } from '../success-checkedin/success-checkedin';
/**
 * Generated class for the EmailCheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email-checkin',
  templateUrl: 'email-checkin.html',
})
export class EmailCheckinPage {

  credentialsForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.credentialsForm = this.formBuilder.group({
        email:['', Validators.compose([
          Validators.pattern(regexValidators.email),
          Validators.required])],
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailCheckinPage');
  }

  lookuUpTapped(){
    this.navCtrl.push(PhoneCheckinPage);
  }

  backTapped() {
    this.navCtrl.popToRoot();
  }

  nextTapped(){
    this.navCtrl.push(SuccessCheckedinPage);
  }

}

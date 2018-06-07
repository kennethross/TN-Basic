import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { regexValidators } from '../validators/validator';

import { EmailCheckinPage } from '../email-checkin/email-checkin';
import { SuccessCheckedinPage } from '../success-checkedin/success-checkedin';

/**
 * Generated class for the PhoneCheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phone-checkin',
  templateUrl: 'phone-checkin.html',
})
export class PhoneCheckinPage {

  credentialsForm: FormGroup;
  phoneNumber : string = '+6';

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.credentialsForm = this.formBuilder.group({
        phone:['', Validators.required],
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneCheckinPage');
  }

  lookuUpTapped() {
    this.navCtrl.push(EmailCheckinPage);
  }

  backTapped() {
    this.navCtrl.popToRoot();
  }

  nextTapped(){
    this.navCtrl.push(SuccessCheckedinPage);
  }

  add(value){
    this.phoneNumber = this.phoneNumber + value;
  }

  delete(){
    if(this.phoneNumber.length > 2) {
      this.phoneNumber = this.phoneNumber.substring(0, this.phoneNumber.length - 1);
    }
  }
}

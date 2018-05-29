import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';

import { SuccessCheckedinPage } from '../success-checkedin/success-checkedin';
/**
 * Generated class for the RegistrationFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration-form',
  templateUrl: 'registration-form.html',
})
export class RegistrationFormPage {

  credentialsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.credentialsForm = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName: ['', Validators.required],
      email:['', Validators.compose([
                   Validators.pattern(regexValidators.email),
                   Validators.required])],
      phone:['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationFormPage');
  }

  backTapped() {
    this.navCtrl.pop();
  }

  nextTapped() {
    console.log("Next Tapped");
    this.navCtrl.push(SuccessCheckedinPage);
  }
}

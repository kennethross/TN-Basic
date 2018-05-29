import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneCheckinPage } from './phone-checkin';

@NgModule({
  declarations: [
    PhoneCheckinPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneCheckinPage),
  ],
})
export class PhoneCheckinPageModule {}

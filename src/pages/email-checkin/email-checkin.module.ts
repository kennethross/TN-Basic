import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailCheckinPage } from './email-checkin';

@NgModule({
  declarations: [
    EmailCheckinPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailCheckinPage),
  ],
})
export class EmailCheckinPageModule {}

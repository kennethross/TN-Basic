import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinInputFieldPage } from './checkin-input-field';

@NgModule({
  declarations: [
    CheckinInputFieldPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinInputFieldPage),
  ],
})
export class CheckinInputFieldPageModule {}

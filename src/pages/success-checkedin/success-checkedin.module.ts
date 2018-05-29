import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessCheckedinPage } from './success-checkedin';

@NgModule({
  declarations: [
    SuccessCheckedinPage,
  ],
  imports: [
    IonicPageModule.forChild(SuccessCheckedinPage),
  ],
})
export class SuccessCheckedinPageModule {}

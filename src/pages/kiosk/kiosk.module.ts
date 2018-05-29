import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KioskPage } from './kiosk';

@NgModule({
  declarations: [
    KioskPage,
  ],
  imports: [
    IonicPageModule.forChild(KioskPage),
  ],
})
export class KioskPageModule {}

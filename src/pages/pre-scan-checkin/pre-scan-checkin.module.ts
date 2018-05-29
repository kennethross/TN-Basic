import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreScanCheckinPage } from './pre-scan-checkin';

@NgModule({
  declarations: [
    PreScanCheckinPage,
  ],
  imports: [
    IonicPageModule.forChild(PreScanCheckinPage),
  ],
})
export class PreScanCheckinPageModule {}

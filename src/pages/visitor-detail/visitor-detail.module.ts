import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitorDetailPage } from './visitor-detail';

@NgModule({
  declarations: [
    VisitorDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitorDetailPage),
  ],
})
export class VisitorDetailPageModule {}

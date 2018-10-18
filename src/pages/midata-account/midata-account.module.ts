import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MidataAccountPage } from './midata-account';

@NgModule({
  declarations: [
    MidataAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MidataAccountPage),
  ],
})
export class MidataAccountPageModule {}

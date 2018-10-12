import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactionPage } from './reaction';

@NgModule({
  declarations: [
    ReactionPage,
  ],
  imports: [
    IonicPageModule.forChild(ReactionPage),
  ],
})
export class ReactionPageModule {}

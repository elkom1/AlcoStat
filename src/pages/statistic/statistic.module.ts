import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticPage } from './statistic';

@NgModule({
  declarations: [
    StatisticPage,
  ],
  imports: [
    IonicPageModule.forChild(StatisticPage),
  ],
})
export class StatisticPageModule {}

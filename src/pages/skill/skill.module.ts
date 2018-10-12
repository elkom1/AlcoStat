import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkillPage } from './skill';

@NgModule({
  declarations: [
    SkillPage,
  ],
  imports: [
    IonicPageModule.forChild(SkillPage),
  ],
})
export class SkillPageModule {}

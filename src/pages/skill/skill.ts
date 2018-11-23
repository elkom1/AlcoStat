import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import pages
import { ReactionPage } from '../reaction/reaction';
import { CoordinationPage } from '../coordination/coordination';
import { BalancePage } from '../balance/balance';

@Component({
  selector: 'page-skill',
  templateUrl: 'skill.html',
})
export class SkillPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SkillPage');
  }

  goToReaction(): void {
    this.navCtrl.push(ReactionPage);
  }

  goToCoordination(): void {
    this.navCtrl.push(CoordinationPage);
  }

  goToBalance(): void {
    this.navCtrl.push(BalancePage);
  }


  swipe(event) {
    if (event.direction === 4) { // 4 = nach links swipen
      this.navCtrl.parent.select(1); // 0 = statistic, 1 = home, 2 = skills
    }
  }

}

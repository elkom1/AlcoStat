import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StatisticPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html',
})
export class StatisticPage {

  isShowTable: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticPage');
  }

  changeView():void {
    this.isShowTable = !this.isShowTable
  }

  swipe(event) {
    if (event.direction === 2) { // 2 = nach rechts swipen
      this.navCtrl.parent.select(1); // 0 = statistic, 1 = home, 2 = skills
    }
  }

}

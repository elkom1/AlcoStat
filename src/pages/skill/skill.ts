import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

// import pages
import { ReactionPage } from '../reaction/reaction';
import { CoordinationPage } from '../coordination/coordination';
import { BalancePage } from '../balance/balance';
import { LoginPage } from '../login/login';
import { ProfilPage } from '../profil/profil';
import { MidataService } from '../../services/midataService';

@Component({
  selector: 'page-skill',
  templateUrl: 'skill.html',
})
export class SkillPage {

  private midataService: MidataService;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetController: ActionSheetController,
    midataService: MidataService) {
      this.midataService = midataService;
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

  // function for show settings
  showMore(): void {
    let actionSheet = this.actionSheetController.create({
      title: 'Einstellungen',
      buttons: [{
          text: 'MIDATA Benutzerkonto',
          role: 'midata_account',
          handler: () => {
            this.navCtrl.push(LoginPage);
          }
        }, {
          text: 'Mein Profil',
          role: 'mein_profil',
          handler: () => {
            this.navCtrl.push(ProfilPage);
          }
        }, {
          text: 'Datenschutzerklärung',
          role: 'datenschutz_erklaerung',
          handler: () => {
            console.log('Go to Datenschutz Erklährung');
          }
        }, {
          text: 'Impressum',
          role: 'impressum',
          handler: () => {
            console.log('Go to Impressum');
          }
        },
        {
          text: 'Logout',
          role: 'Logout',
          handler: () => {
            this.midataService.logout();
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    actionSheet.present();
  }
}

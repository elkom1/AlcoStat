import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';
import { ProfilPage } from '../profil/profil';
import { MidataService } from '../../services/midataService';

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

  private midataService: MidataService; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public localStorage: LocalDatabaseProvider, 
    public actionSheetController: ActionSheetController,
    midataService: MidataService) {
      this.midataService = midataService; 
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

  goLoginPage() {
    this.navCtrl.push(LoginPage); 
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

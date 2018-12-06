import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController
} from 'ionic-angular';
import {
  LoginPage
} from '../login/login';
import {
  LocalDatabaseProvider
} from '../../providers/local-database/local-database';
import {
  ProfilPage
} from '../profil/profil';
import {
  MidataService
} from '../../services/midataService';
import {
  DatenschutzPage
} from '../datenschutz/datenschutz';
import {
  ImpressumPage
} from '../impressum/impressum';
import { Bac } from '../../providers/bac';

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

  bac: Bac;

  private midataService: MidataService;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public localStorage: LocalDatabaseProvider,
    public actionSheetController: ActionSheetController,
    midataService: MidataService) {
    this.midataService = midataService;

    if (typeof this.bac === 'undefined') {
      this.bac = {
        value: 0,
        time: new Date()
      };
    }

  }

  ngAfterViewInit() {
    setInterval(() => this.updateBac(), 30000);
  }

  ionViewDidLoad() {
    this.updateBac();
    console.log('ionViewDidLoad StatisticPage');
  }

  ionViewWillEnter() {
    this.updateBac();
  }

  updateBac() {
    this.localStorage.getBac().then((val) => {
      this.bac = val;
    })
  }

  changeView(): void {
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
          icon: 'contact',
          role: 'midata_account',
          handler: () => {
            this.navCtrl.push(LoginPage);
          }
        }, {
          text: 'Mein Profil',
          icon: 'person',
          role: 'mein_profil',
          handler: () => {
            this.navCtrl.push(ProfilPage);
          }
        }, {
          text: 'Datenschutzerklärung',
          icon: 'lock',
          role: 'datenschutz_erklaerung',
          handler: () => {
            this.navCtrl.push(DatenschutzPage)
          }
        }, {
          text: 'Impressum',
          icon: 'people',
          role: 'impressum',
          handler: () => {
            this.navCtrl.push(ImpressumPage)
          }
        },
        {
          text: 'Logout',
          icon: 'log-out',
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

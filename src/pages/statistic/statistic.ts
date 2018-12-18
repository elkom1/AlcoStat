import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController,
  AlertController
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

  isShowDayTable: boolean = false;
  isShowWeekTable: boolean = false;
  isShowMonthTable: boolean = false;
  isShowScheduledTable: boolean = false;
  isShowHint: boolean = false;

  bac: Bac;
  entries: any = []
  test: any = {};


  private midataService: MidataService;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public localStorage: LocalDatabaseProvider,
    public actionSheetController: ActionSheetController,
    midataService: MidataService,
    public alertCtr: AlertController) {
    this.midataService = midataService;

    if (typeof this.bac === 'undefined') {
      this.bac = {
        value: 0,
        time: new Date()
      };
    }
  }

  showInfo() {
    let alert = this.alertCtr.create({
      title: 'Getränke Informationen',
      subTitle: 'Bier: blau <br> Wein: Orange <br> Cocktail: Grau <br> Schnaps: Gelb',
      buttons: ['OK']
    });
    alert.present();
    this.isShowHint = !this.isShowHint;
  }

  showDayTable() {
    this.isShowDayTable = true; 
    this.isShowWeekTable = false; 
    this.isShowMonthTable = false; 
    this.isShowScheduledTable = false; 
  }

  showWeekTable() {
    this.isShowWeekTable = true; 
    this.isShowDayTable = false; 
    this.isShowMonthTable = false; 
    this.isShowScheduledTable = false; 
  }

  showMonthTable() {
    this.isShowMonthTable = true; 
    this.isShowWeekTable = false; 
    this.isShowDayTable = false; 
    this.isShowScheduledTable = false; 
  }

  ngAfterViewInit() {
    setInterval(() => this.updateBac(), 30000);
 
  }

  ionViewWillEnter() {
    this.updateBac();
    
    this.midataService.search('Observation').then((data) => {
      this.test = data[0].toJson();
      this.test = this.test.effectiveDateTime;
      this.entries = []

      data.forEach((val) => {
        console.log("foreach...");
        let entry: any;
        let value: any;
        let alc: number;
        let time: any;
        let category: any;
        value = val.toJson();
        alc = value.component[0].valueQuantity.value
        time = value.effectiveDateTime;
        category = value.component[1].valueString;
        entry = {alc, time, category};
        this.entries.push(entry);
      })

      this.isShowScheduledTable = true;
    });
  }

  updateBac() {
    this.localStorage.getBac().then((val) => {
      this.bac = val;
    })
  }

  changeView(): void { 
    this.isShowScheduledTable = ! this.isShowScheduledTable;
    
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

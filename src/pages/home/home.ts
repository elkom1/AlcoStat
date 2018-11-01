import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import Pages
import { MidataAccountPage } from '../midata-account/midata-account';
import { ProfilPage } from '../profil/profil';

// imports for sliding 
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

// import for more-button
import { ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // for sliding
  @ViewChild(Slides) slides: Slides;

  isAddingDrink: boolean;
  selectedDrink: number;
  selectedVolume: number;
  drinksArr: any = [
    { img: "bier.png", volume: ["2.5dl", "3.3dl", "5dl"] },
    { img: "wein.png", volume: ["1dl", "2dl", "3dl"] },
    { img: "drink.png", volume: ["2cl", "4cl", "6cl"] },
    { img: "shot.png", volume: ["1cl", "2cl", "3cl"] }
  ];


  imageSourceTemplate: string = "../../assets/imgs/";
  imageSource: string;

  constructor(public navCtrl: NavController, public actionSheetController: ActionSheetController) {

  }

  ionViewDidLoad() {
    this.isAddingDrink = false;
    this.selectedDrink = 0;
    this.selectedVolume = 1;
  }

  // methods
  addDrink(drink: number): void {
    this.selectedDrink = drink;
    this.selectedVolume = 1;
    this.imageSource = this.imageSourceTemplate.concat(this.drinksArr[drink].img);
    this.isAddingDrink = true;
    console.log(this.imageSource);
  }

  reduceVolume(): void {
    if (this.selectedVolume > 0) {
      this.selectedVolume--;
    }
  }

  increaseVolume(): void {
    if (this.selectedVolume < 2) {
      this.selectedVolume++;
    }
  }



  showMore(): void {
    let actionSheet = this.actionSheetController.create({
      title: 'Einstellungen',
      buttons: [
        {
          text: 'MIDATA Account',
          role: 'midata_account',
          handler: () => {
            this.navCtrl.push(MidataAccountPage);
          }
        }, {
          text: 'Mein Profil',
          role: 'mein_profil',
          handler: () => {
            this.navCtrl.push(ProfilPage);
          }
        }, {
          text: 'Datenschutz erklärung',
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
        }
      ]
    });
    actionSheet.present();
  }

  /*
  swipe function
  2 = nach rechts swipen
  4 = nach links swipen
  parent.selecht(x): 0 = statistic, 1 = home, 2 = skills
  */
  swipe(event) {
    if (event.direction === 2) { // 2 = nach rechts swipen
      this.navCtrl.parent.select(2);
    } else if (event.direction === 4) { // 4 = nach links swipen
      this.navCtrl.parent.select(0);
    }
  }

}

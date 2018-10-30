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

  isAddingDrink: boolean = false;

  drinksArr:string[] = ["bier.png", "wein.png", "drink.png", "shot.png"];

  imageSourceTemplate:string = "../../assets/imgs/";
  imageSource:string;

  


  constructor(public navCtrl: NavController, public actionSheetController: ActionSheetController) {

  }

    // methods
    addDrink(drink: number):void {
      this.imageSource = this.imageSourceTemplate.concat(this.drinksArr[drink]);
      this.isAddingDrink = true;
     console.log(this.imageSource);
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
        },{
          text: 'Mein Profil',
          role: 'mein_profil',
          handler: () => {
            this.navCtrl.push(ProfilPage);
          }
        },{
          text: 'Datenschutz erklärung',
          role: 'datenschutz_erklaerung',
          handler: () => {
            console.log('Go to Datenschutz Erklährung');
          }
        },{
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
    if(event.direction === 2) { // 2 = nach rechts swipen
      this.navCtrl.parent.select(2);
    } else if (event.direction === 4) { // 4 = nach links swipen
      this.navCtrl.parent.select(0);
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';
import { UserProfil } from '../../providers/userProfil';




/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  userProfil: UserProfil  = {
    weight: null,
    sex: null,
  }
  
  constructor(public navCtrl: NavController,
    public localDatabase: LocalDatabaseProvider ,
    public navParams: NavParams) {
  }

  ionViewWillEnter(): void {
    this.localDatabase.getUserProfil().then((val) => {
      // profil not set yet
      if(val == null) {
        this.userProfil  = {
          weight: null,
          sex: null,
        }
      } else { // prifil is set already
        this.userProfil = val;
      }
    })
  }


  saveUserProfil():void {
    console.log("saveUserProfil")
    this.localDatabase.setUserProfil(this.userProfil);
    this.navCtrl.pop();
  }


  // tester Mehtode
  clearPegel(): void {
    let bac = {
      value: 0,
      time: new Date(),
    }
    this.localDatabase.setBac(bac);
    this.navCtrl.pop();
  }

}

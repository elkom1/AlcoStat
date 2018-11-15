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

  userProfil: UserProfil = {
    weight: null,
    sex: null,
  }
  
  constructor(public navCtrl: NavController,
    public localDatabase: LocalDatabaseProvider ,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }


  saveUserProfil():void {
    this.localDatabase.setUserProfil(this.userProfil);
  }

}

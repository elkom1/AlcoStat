import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HomePage } from '../../pages/home/home';
import { MidataService } from '../../services/midataService';
import {NativeStorage} from '@ionic-native/native-storage';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  constructor(
      public navCtrl: NavController,
      private loadingCtrl: LoadingController,
      private inAppBrowser: InAppBrowser,
      private midataService: MidataService) {
  }

  register(){
    this.inAppBrowser.create('https://test.midata.coop/#/portal/registration');
  }

  visitMidata(){
    this.inAppBrowser.create('https://midata.coop');
  }

  login() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...' // TODO: Translate
    });

    loading.present().catch();

    this.midataService.authenticate()
      .then((success: boolean) => {
      return this.navCtrl.setRoot(TabsPage)
    })
      .then(() => {
      loading.dismiss().catch();
    })
      .catch((error) => {
      console.log(error);
      console.log(this.midataService.getNetworkState());
      loading.dismiss().catch();
    })

    //   return this.midataService.syncMidataRecordsToLocalStorage(1000); // TODO: Delegate to MidataService
  }
}

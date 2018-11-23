import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MidataService } from '../../services/midataService';
 import { TabsPage } from '../tabs/tabs';


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

  // register(){
  //   this.inAppBrowser.create('https://test.midata.coop/#/portal/registration');
  // }

  // visitMidata(){
  //   this.inAppBrowser.create('https://midata.coop');
  // }

  login() {

    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...' // TODO: Translate
    // });

    // loading.present().catch();

    this.midataService.authenticate()
      .then((success: boolean) => {
        if(success)
          this.navCtrl.pop();
        else
          console.log('sbpbiusbvdugipvad')
    });
    //   .catch((error) => {
    //   console.log(error);
    //   console.log(this.midataService.getNetworkState());
    //   loading.dismiss().catch();
    // })

   // this.navCtrl.setRoot(TabsPage);

    //   return this.midataService.syncMidataRecordsToLocalStorage(1000); // TODO: Delegate to MidataService
  }
}

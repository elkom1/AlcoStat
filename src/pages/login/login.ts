import {
  Component
} from '@angular/core';
import {
  NavController,
  LoadingController,
  Platform
} from 'ionic-angular';
import {
  InAppBrowser
} from '@ionic-native/in-app-browser';
import {
  MidataService
} from '../../services/midataService';
import {
  TabsPage
} from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private inAppBrowser: InAppBrowser,
    private midataService: MidataService,
    private platform: Platform) {}

  register() {
    this.inAppBrowser.create('https://test.midata.coop/#/portal/registration');
  }

  visitMidata() {
    this.inAppBrowser.create('https://midata.coop');
  }


  login() {
    let loading = this.loadingCtrl.create({
      content: 'Bitte warten...' 
    });

    loading.present().catch();

    this.midataService.authenticate()
      .then((success: boolean) => {
        return this.navCtrl.pop();
      })
      .then(() => {
        loading.dismiss().catch();
      })
      .catch((error) => {
        loading.dismiss().catch();
      })
  }

}

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MidataService } from '../services/midataService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav;

  //rootPage;
  rootPage:any = TabsPage;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public midataService: MidataService) {

  }
  ngOnInit(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // ngAfterViewInit(){ 
  //   this.midataService.openSession().then((success) => {
  //     if (success) {
  //       this.nav.setRoot(TabsPage);
  //     }
  //     else {
  //       this.nav.push(LoginPage);
  //     }
  //   }).catch((error) => {
  //     this.nav.setRoot(LoginPage);
  //   });

  // }
}

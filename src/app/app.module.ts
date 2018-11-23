import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import {NativeStorage} from '@ionic-native/native-storage';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from "@ionic-native/in-app-browser";

// Additional service for midata
import { MidataService} from "../services/midataService";

// import pages
import { StatisticPage } from '../pages/statistic/statistic';
import { SkillPage } from '../pages/skill/skill';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ReactionPage } from '../pages/reaction/reaction';
import { CoordinationPage } from '../pages/coordination/coordination';
import { BalancePage } from '../pages/balance/balance';
import { MidataAccountPage } from '../pages/midata-account/midata-account';
import { ProfilPage } from '../pages/profil/profil';
import { LoginPage } from "../pages/login/login";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import plugins
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { IonicStorageModule } from '@ionic/storage';
import { LocalDatabaseProvider } from '../providers/local-database/local-database';

@NgModule({
  declarations: [
    MyApp,
    StatisticPage,
    SkillPage,
    HomePage,
    TabsPage,
    ReactionPage,
    CoordinationPage,
    BalancePage,
    MidataAccountPage,
    ProfilPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StatisticPage,
    SkillPage,
    HomePage,
    TabsPage,
    ReactionPage,
    CoordinationPage,
    BalancePage,
    MidataAccountPage,
    ProfilPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NativePageTransitions,
    LocalDatabaseProvider,
    NativeStorage, 
    MidataService, 
    SecureStorage, 
    Network, 
    InAppBrowser
  ]
})
export class AppModule { }

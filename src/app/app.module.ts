import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import pages
import { StatisticPage } from '../pages/statistic/statistic';
import { SkillPage } from '../pages/skill/skill';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ReactionPage } from '../pages/reaction/reaction';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import plugins
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

@NgModule({
  declarations: [
    MyApp,
    StatisticPage,
    SkillPage,
    HomePage,
    TabsPage,
    ReactionPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StatisticPage,
    SkillPage,
    HomePage,
    TabsPage,
    ReactionPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    // add plugin to providers
    NativePageTransitions,
  ]
})
export class AppModule { }

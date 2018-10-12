import { Component } from '@angular/core';

import { SkillPage } from '../skill/skill';
import { StatisticPage } from '../statistic/statistic';
import { HomePage } from '../home/home';

// import plugins
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // For transition
  // Declare these variables for hold tabs index
  // and check if tab is loaded.
  loaded: boolean = false;
  tabIndex: number = 0;

  tab1Root = HomePage;
  tab2Root = SkillPage;
  tab3Root = StatisticPage;

  // inject nativPageTransition
  constructor(private nativePageTransitions: NativePageTransitions) {

  }

  // Create the function for getting animation direction by tab index
  private getAnimationDirection(index): string {
    var currentIndex = this.tabIndex;

    this.tabIndex = index;

    switch (true) {
      case (currentIndex < index):
        return ('left');
      case (currentIndex > index):
        return ('right');
    }
  }

  // Create the function for the animated transition
  public transition(e): void {
    let options: NativeTransitionOptions = {
      direction: this.getAnimationDirection(e.index),
      duration: 250,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 20,
      androiddelay: 0,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 48
    };

    if (!this.loaded) {
      this.loaded = true;
      return;
    }

    this.nativePageTransitions.slide(options);
  }
}

import { Component } from '@angular/core';

import { SkillPage } from '../skill/skill';
import { StatisticPage } from '../statistic/statistic';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SkillPage;
  tab3Root = StatisticPage;

  constructor() {

  }
}

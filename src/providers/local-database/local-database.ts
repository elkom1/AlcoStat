
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { UserProfil } from '../userProfil';
import { Bac } from '../bac';
import { Score } from '../score';

/*
  Generated class for the LocalDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalDatabaseProvider {
  userProfil_key: string = 'userProfil';
  bac_key: string = 'bac';
  score_key: string = 'score';
  scoreArr: Score[] = [];

  constructor(public localStorage: Storage) {
    console.log('Hello LocalDatabaseProvider Provider');
  }

  setUserProfil(data: UserProfil) {
    this.localStorage.set(this.userProfil_key, data);
  }

  getUserProfil(): Promise<UserProfil> {
    return this.localStorage.get(this.userProfil_key);
  }

  setBac(bac: Bac): Promise<any> {
    return this.localStorage.set(this.bac_key, bac);
  }

  getBac(): Promise<Bac> {
    return this.localStorage.get(this.bac_key);
  }

  setReactionScore(time: number): Promise<any> {
    return this.getReactionScore().then((val) => {
      return this.getBac().then((bac) => {
        let score: Score = { time: time, bac: bac.value };
        this.scoreArr = val;
        this.scoreArr.push(score)
        this.localStorage.set(this.score_key, this.scoreArr);
        return true;
      })
    });
  }

  getReactionScore(): Promise<Score[]> {
    return this.localStorage.get(this.score_key).then((val) => {
      if (val == null) {
        return [];
      } else {
        return val;
      }
    });
  }



}

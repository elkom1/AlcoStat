
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { UserProfil } from '../userProfil';

/*
  Generated class for the LocalDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalDatabaseProvider {
  userProfil_key: string = 'userProfil';
  bac_key: string = 'bac';

  constructor(public localStorage: Storage) {
    console.log('Hello LocalDatabaseProvider Provider');
  }

  setUserProfil(data: UserProfil) {
    this.localStorage.set(this.userProfil_key, data);
  }

  getUserProfil(): Promise<UserProfil> {
    return this.localStorage.get(this.userProfil_key);
  }

  setBac(bac: number) {
    this.localStorage.set(this.bac_key, bac);
  }

  getBac(): Promise<number> {
    return this.localStorage.get(this.bac_key);
  }



}

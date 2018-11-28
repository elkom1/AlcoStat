import {
  Component
} from '@angular/core';
import {
  NavController,
  DateTime
} from 'ionic-angular';

// import Pages
import {
  MidataAccountPage
} from '../midata-account/midata-account';
import {
  ProfilPage
} from '../profil/profil';

// import for more-button
import {
  ActionSheetController
} from 'ionic-angular';

// Provider
import {
  LocalDatabaseProvider
} from '../../providers/local-database/local-database';
import {
  UserProfil
} from '../../providers/userProfil';
import {
  Bac
} from '../../providers/bac';
import {
  MidataService
} from '../../services/midataService';
import {
  LoginPage
} from '../login/login';
import {
  Observation,
  Bundle
} from 'Midata';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // for sliding
  //@ViewChild(Slides) slides: Slides;

  //test:any = "noEnter";

  bac: Bac;

  intervalID: number = 0;

  userConsumation = {
    drinkIndex: 0,
    volumeIndex: 0,
    percentageOfAlc: 0,
    volume: 0,
    numberOfDrink: 0
  };

  isAddingDrink: boolean;
  selectedDrink: number;
  percentageOfAlcOfDrink: number;
  selectedVolume: number;
  numberOfDrink: number;
  drinksArr: any = [{
      img: "bier.png",
      volume: [250, 330, 500],
      percentageOfAlc: 5,
      alkSteps: 0.5
    },
    {
      img: "wein.png",
      volume: [100, 200, 300],
      percentageOfAlc: 12,
      alkSteps: 0.5
    },
    {
      img: "drink.png",
      volume: [20, 40, 60],
      percentageOfAlc: 40,
      alkSteps: 5
    },
    {
      img: "shot.png",
      volume: [10, 20, 30],
      percentageOfAlc: 40,
      alkSteps: 5
    }
  ];


  imageSourceTemplate: string = "../../assets/imgs/";
  imageSource: string;

  private midataService: MidataService;

  constructor(public navCtrl: NavController,
    public localStorage: LocalDatabaseProvider,
    public actionSheetController: ActionSheetController,
    midataService: MidataService) {

    if (typeof this.bac === 'undefined') {
      this.bac = {
        value: 0,
        time: new Date()
      };
    }

    this.midataService = midataService;
  }

  // TESTER
  callUpdateBac(): void {
    this.updateBac(0).then(() => {
      console.log('BAC got updated')
    });
  }

  ngAfterViewInit() {
    this.isAddingDrink = false;

    this.localStorage.getBac().then((bac) => {
      if (!bac) {

        console.log("bac is null")

        this.bac.value = 0;
        this.bac.time = new Date();
        this.localStorage.setBac(this.bac).then(() => {
          console.log('wuiiiiiiiiii')
        });

      } else {
        console.log("bac is: " + bac.value + "time: " + bac.time + "type: " + typeof (bac.time))

        this.bac = bac;

      }
    })

  }

  updateBac(bacToAdd: number): Promise < any > {
    return this.localStorage.getBac().then((val) => {
      let newDate: Date = new Date();
      let newDateInMilisec: number = newDate.getTime();

      // important
      // val.time is a string on the device, because of that
      // it's need to be integratet in a new Date()
      let oldDate: Date = new Date(val.time);
      console.log(typeof (oldDate));
      let oldDateInMilisec = oldDate.getTime();
      let passedTime = newDateInMilisec - oldDateInMilisec;

      this.bac.time = newDate;

      // WARNING
      // it is calculating with Minutes and not with houers
      // for Presentation Purpose only
      let timeToReduceBac: number = 60000; // --> 1 Minute instead of 1 houer
      this.bac.value = this.bac.value - (0.1 * (passedTime / timeToReduceBac));
      if (this.bac.value < 0) {
        this.bac.value = 0;
      }

      // when a drink was added, bacToAdd needs to add to the bac
      this.bac.value += bacToAdd;
      this.localStorage.setBac(this.bac);
    });
  }

  //// METHODS FOR DRINK ////
  // Adding Drink
  addDrink(drink: number): void {

    this.userConsumation.drinkIndex = drink;
    this.userConsumation.volumeIndex = 1;
    this.userConsumation.percentageOfAlc = this.drinksArr[this.userConsumation.drinkIndex].percentageOfAlc;
    this.userConsumation.volume = this.drinksArr[this.userConsumation.drinkIndex].volume[this.userConsumation.volumeIndex];
    this.userConsumation.numberOfDrink = 1;
    // binding image
    this.imageSource = this.imageSourceTemplate.concat(this.drinksArr[drink].img);

    //this.selectedDrink = drink;
    //this.selectedVolume = 1;
    this.isAddingDrink = true;

  }

  saveDrink(): void {
    this.localStorage.getUserProfil().then((val) => {
      if (val == null) {
        this.navCtrl.push(ProfilPage);
      } else {

        this.calculateBacValue(val).then((bacToAdd) => {

          this.updateBac(bacToAdd);


          /*
          this.localStorage.getBac().then((oldBac) => {
            
            if (val == null) {
              this.bac.value = bacToAdd;
              
              this.bac.time = new Date();
            } else {
              this.bac = bac + val;
            }
            this.localStorage.setBac(this.bac);
            this.isAddingDrink = false;         

          });
          */
          this.isAddingDrink = false;

        });

        let codingStuff = {
          coding: [{
            system: 'http://snomed.info/sct',
            code: '160573003',
            display: 'Alkoholkonsum'
          }]
        }

        let category = {
            coding: [{
              system: 'http://hl7.org/fhir/observation-category',
              code: 'survey',
              display: 'Survey'
            }],
          },
          effectivePeriod: {
            start: DateTime;
            end: DateTime;
          }

        let entry = new Observation({
          _dateTime: new Date().toISOString()
        }, codingStuff, category);

        entry.addComponent({

          code: {
            coding: [{
              "system": "http://snomed.info/sct",
              "code": "274776000",
              "display": "Alkohol in Gramm"
            }]
          },
          valueQuantity: {
            value: this.userConsumation.volume * ( this.userConsumation.percentageOfAlc / 100) * 0.8 
          }
        })

        entry.addComponent({

          code: {
            coding: [{
              //Muss noch validiert werden von Alexander Kreuz 
              "system": "http://snomed.info/sct",
              "code": "160573003",  //muss noch angeschaut werden welcher snomed code hier passt
              "display": "Getränketyp"
            }]
          },
          valueString: this.drinksArr[0].img //muss noch deklariert werden 
        
        })

        let bundle = new Bundle("transaction");
        bundle.addEntry("POST", entry.resourceType, entry);
        this.midataService.save(bundle);

      }
    });
  }

  async calculateBacValue(data: UserProfil): Promise < number > {
    let numOfDrink = this.userConsumation.numberOfDrink;
    let volume = this.userConsumation.volume;
    let alcVol = this.userConsumation.percentageOfAlc;
    let alcInGram = volume * (alcVol / 100) * 0.8;

    // sex == true --> weiblich
    if (data.sex) {
      return ((numOfDrink * alcInGram) / (data.weight * 0.55));

    } else { // männlich
      return ((numOfDrink * alcInGram) / (data.weight * 0.68));
    }
  }



  // changing Volume
  reduceVolume(): void {
    if (this.userConsumation.volumeIndex > 0) {
      this.userConsumation.volumeIndex--;
      this.userConsumation.volume = this.drinksArr[this.userConsumation.drinkIndex].volume[this.userConsumation.volumeIndex];
    }
  }

  increaseVolume(): void {
    if (this.userConsumation.volumeIndex < 2) {
      this.userConsumation.volumeIndex++;
      this.userConsumation.volume = this.drinksArr[this.userConsumation.drinkIndex].volume[this.userConsumation.volumeIndex];
    }
  }

  // changing number of drinks
  reduceNumberOfDrinks(): void {
    if (this.userConsumation.numberOfDrink > 0) {
      this.userConsumation.numberOfDrink--;
    }
  }

  increaseNumberOfDrinks(): void {
    if (this.userConsumation.numberOfDrink < 10) {
      this.userConsumation.numberOfDrink++;
    }
  }

  // changing percentage of alcohol
  reducePercentageOfAlc(): void {
    if (this.userConsumation.percentageOfAlc > 2 * this.drinksArr[this.userConsumation.drinkIndex].alkSteps) {
      this.userConsumation.percentageOfAlc -= this.drinksArr[this.userConsumation.drinkIndex].alkSteps;
    }
  }

  increasePercentageOfAlc(): void {
    if (this.userConsumation.percentageOfAlc < 30 * this.drinksArr[this.userConsumation.drinkIndex].alkSteps) {
      this.userConsumation.percentageOfAlc += this.drinksArr[this.userConsumation.drinkIndex].alkSteps;
    }
  }



  // function for show settings
  showMore(): void {
    let actionSheet = this.actionSheetController.create({
      title: 'Einstellungen',
      buttons: [{
          text: 'MIDATA Account',
          role: 'midata_account',
          handler: () => {
            this.navCtrl.push(MidataAccountPage);
          }
        }, {
          text: 'Mein Profil',
          role: 'mein_profil',
          handler: () => {
            this.navCtrl.push(ProfilPage);
          }
        }, {
          text: 'Datenschutz erklärung',
          role: 'datenschutz_erklaerung',
          handler: () => {
            console.log('Go to Datenschutz Erklährung');
          }
        }, {
          text: 'Impressum',
          role: 'impressum',
          handler: () => {
            console.log('Go to Impressum');
          }
        },
        {
          text: 'Logout',
          role: 'Logout',
          handler: () => {
            this.midataService.logout();
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    actionSheet.present();
  }

  /*
  swipe function
  2 = nach rechts swipen
  4 = nach links swipen
  parent.selecht(x): 0 = statistic, 1 = home, 2 = skills
  */
  swipe(event) {
    if (event.direction === 2) { // 2 = nach rechts swipen
      this.navCtrl.parent.select(2);
    } else if (event.direction === 4) { // 4 = nach links swipen
      this.navCtrl.parent.select(0);
    }
  }

}

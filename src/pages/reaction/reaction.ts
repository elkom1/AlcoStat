import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reaction',
  templateUrl: 'reaction.html',
})
export class ReactionPage {

  // variable for game controll
  isPlayGame: boolean = false;
  isShowStartButton: boolean = true;
  isShowAntiCheat: boolean = false;
  hasFailed:boolean = false;
  timeToWait: number;
  timeoutId: number;
  __nativeST__:any = window.setTimeout

  // variable for score
  scores: number[] = [];
  isShowScore: boolean = false;

  // variables for getRandomColor
  letters: string = "0123456789ABCDEF";
  letterArr: string[] = [];
  color: string = "red";

  // variables for time
  clickedTime: Date;
  createdTime: Date;
  reactionTime: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReactionPage');
  }

  // methods
  startGame():void {
    this.isShowStartButton = false;
    this.isShowAntiCheat = true;
    this.hasFailed = false;
    this.getRandomColor();
    this.timeToWait = 1000 + (Math.random() * 3000);
    this.timeoutId = this.setTimeout(this.buildDiv, this.timeToWait);
  }

  buildDiv():void {
    this.isShowAntiCheat = false;
    this.isPlayGame = true;
    this.createdTime = new Date();
  }

  stopTime(): void {
    this.clickedTime = new Date();
    this.reactionTime = Math.abs(this.clickedTime.getTime() - this.createdTime.getTime());
    this.isPlayGame = false;
    this.isShowStartButton = true;
    this.saveScore(this.reactionTime);
  }


  saveScore(time: number): void {
    this.scores.push(time);
  }

  showScores(): void {
    this.isShowScore = true;
  }

  hideScore(): void {
    this.isShowScore = false;
  }

  failed(): void {
    window.clearTimeout(this.timeoutId);
    this.hasFailed = true;
    this.isShowAntiCheat = false;
    this.isPlayGame = false;
    this.isShowStartButton = true;
    console.log('you have failed')
  }





// Helpt Methods

  getRandomColor():void {
    this.letters = "0123456789ABCDEF";
    this.letterArr = this.letters.split("");
    this.color = "#";
    for (var i=0; i<6; i++) {
    this.color+= this.letterArr[Math.round(Math.random()*15)];
    }
    
  }

/*
Helfer Methode, da defaul Funktion setTimeout das this nicht korrekt bindet.
MDN: "this" wird in der aufgerufenen Funktion window oder global entsprechen,
nicht dem "this" des Bereichs (reaction.ts), in dem  setTimeout() aufgerufen wurde.
*/
  setTimeout(vCallback, nDelay) {
    var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
    return this.__nativeST__(vCallback instanceof Function ? function () {
      vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
  };

}

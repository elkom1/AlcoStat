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
  timeToWait: number;
  __nativeST__:any = window.setTimeout

  // variables for getRandomColor
  letters: string = "0123456789ABCDEF";
  letterArr: string[] = [];
  color: string = "";

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
    this.timeToWait = Math.random() * 2000;
    console.log("startGame()");
    this.setTimeout(this.buildDiv, this.timeToWait);
  }

  startGame2():void {
    this.isPlayGame = true;
    this.createdTime = new Date();
  }


  buildDiv():void {
    console.log("buildDiv");
    this.isPlayGame = true;
    this.createdTime = new Date();
  }


  // noch nicht im gebraucht...
  getRandomColor():void {
    this.letters = "0123456789ABCDEF";
    this.letterArr = this.letters.split("");
    this.color = "#";
    for (var i=0; i<6; i++) {
    this.color+= this.letterArr[Math.round(Math.random()*15)];
    }
  }

  stopTime(): void {
    this.clickedTime = new Date();
    this.reactionTime = Math.abs(this.clickedTime.getTime() - this.createdTime.getTime());
    this.isPlayGame = false;
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

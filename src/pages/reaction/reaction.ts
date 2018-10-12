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
    this.createdTime = new Date();
    this.isPlayGame = true;
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



}

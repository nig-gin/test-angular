import {Component, OnInit} from '@angular/core';

import { Subscription, Observable} from 'rxjs';
import {map, single} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  timeSScount = 0;
  sub: Subscription;
  start: boolean;
  wait: boolean;
  timeSS = 0;
  timeMM = 0;
  timeHH = 0;

  click = 0; // Для подсчета кликов

  constructor() {
  }
  OnStart(event: Event) {
    this.start = !this.start;
    if (this.wait) {
      this.wait = false;
      this.start = true;
    }
    if (this.start === true) {
      const stream$ = new Observable(observer => {
        setInterval(() => {
          observer.next();
        }, 50);
      });
      this.sub = stream$
        .subscribe(value => {
          this.timeSScount = this.timeSScount + 1;
          this.Cout(this.timeSScount);
        });
    }
    if (this.start === false && !this.wait ) {
      this.timeSScount = 0;
      this.timeHH = 0;
      this.timeMM = 0;
      this.timeSS = 0;
      this.sub.unsubscribe();
    }

  }
  Cout(second: number) {
    this.timeHH = Math.trunc( second / 3600);
    this.timeMM = Math.trunc((second / 60) - (this.timeHH * 60));
    this.timeSS = Math.trunc(second - this.timeMM * 60 - this.timeHH * 3600);
  }
  ResetDbCl(){
    this.click++;
    setTimeout(() => {
      if (this.click === 2) {
        this.Reset();
      }
      this.click = 0;
    }, 300);
  }

  Reset(){
    this.timeSScount = 0;
    this.timeHH = 0;
    this.timeMM = 0;
    this.timeSS = 0;
    this.wait = false;

  }
  Wait(event: Event){
    this.wait = true;
    this.start = false;
    this.sub.unsubscribe();
  }
}


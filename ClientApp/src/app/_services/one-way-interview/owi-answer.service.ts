import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OneWayInterViewAnswerList } from 'src/app/_models/one-way-interview/one-way-interview-answer';

@Injectable({
  providedIn: 'root'
})
export class OwiAnswerService {


  selectedAnswer: OneWayInterViewAnswerList;
  selectedAnswer$: BehaviorSubject<OneWayInterViewAnswerList>;

  constructor() {
    this.selectedAnswer$ = new BehaviorSubject<OneWayInterViewAnswerList>(new OneWayInterViewAnswerList());
    this.selectedAnswer = new OneWayInterViewAnswerList();

    this.selectedAnswer$.subscribe((x) => {
      this.selectedAnswer = x;
    });
  }
}

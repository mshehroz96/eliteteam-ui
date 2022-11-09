import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobRequestService {

  activeStepIndex = new BehaviorSubject<number>(0);
  constructor() {

  }
}

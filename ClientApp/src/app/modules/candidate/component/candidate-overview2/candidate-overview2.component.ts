import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-overview2',
  templateUrl: './candidate-overview2.component.html',
  styleUrls: ['./candidate-overview2.component.css']
})
export class CandidateOverview2Component implements OnInit {

  @Input() candidate: any = {}
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-stats',
  templateUrl: './candidate-stats.component.html',
  styleUrls: ['./candidate-stats.component.css']
})
export class CandidateStatsComponent implements OnInit {
  @Input() candidateStats : any = {};
  constructor() { }

  ngOnInit(): void {
  }

}

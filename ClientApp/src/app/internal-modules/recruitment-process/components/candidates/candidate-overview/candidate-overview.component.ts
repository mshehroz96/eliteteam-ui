import { Component, Input, OnInit } from '@angular/core';
import { RequisitionCandidate } from 'src/app/_models/recruitment/requisition-candidate';

@Component({
  selector: 'app-candidate-overview',
  templateUrl: './candidate-overview.component.html',
  styleUrls: ['./candidate-overview.component.css']
})
export class CandidateOverviewComponent implements OnInit {

  @Input() candidate!: RequisitionCandidate;
  
  constructor() { }

  ngOnInit(): void {
  }

}

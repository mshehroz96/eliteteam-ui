import { Component, Input, OnInit } from '@angular/core';
import { RequisitionCandidate } from 'src/app/_models/recruitment/requisition-candidate';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  @Input()
  candidates!: RequisitionCandidate[];
  constructor() { }

  ngOnInit(): void {
  }

  paginate(event: any) {
    console.log(event);
  }
}

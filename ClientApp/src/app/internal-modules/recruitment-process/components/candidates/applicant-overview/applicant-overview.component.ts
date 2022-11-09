import { Component, Input, OnInit } from '@angular/core';
import { RequisitionCandidate } from 'src/app/_models/recruitment/requisition-candidate';

@Component({
  selector: 'app-applicant-overview',
  templateUrl: './applicant-overview.component.html',
  styleUrls: ['./applicant-overview.component.css']
})
export class ApplicantOverviewComponent implements OnInit {

  @Input() candidate!:RequisitionCandidate;

  constructor() { }

  ngOnInit(): void {
  }

}

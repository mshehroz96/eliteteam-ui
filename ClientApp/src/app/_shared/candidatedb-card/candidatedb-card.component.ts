import { Component, Input, OnInit } from '@angular/core';
import { UserOverview } from 'src/app/_models/user/user-overview';

@Component({
  selector: 'app-candidatedb-card',
  templateUrl: './candidatedb-card.component.html',
  styleUrls: ['./candidatedb-card.component.css']
})
export class CandidateDBCardComponent implements OnInit {

  @Input() UserOverView: UserOverview;

  constructor() {
    this.UserOverView= new UserOverview();
   }

  ngOnInit(): void {
  }

}

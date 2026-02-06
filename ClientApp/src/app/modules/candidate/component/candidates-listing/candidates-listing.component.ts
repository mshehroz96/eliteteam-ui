import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidates-listing',
  templateUrl: './candidates-listing.component.html',
  styleUrls: ['./candidates-listing.component.css']
})
export class CandidatesListingComponent implements OnInit {

  @Input() candidates: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}

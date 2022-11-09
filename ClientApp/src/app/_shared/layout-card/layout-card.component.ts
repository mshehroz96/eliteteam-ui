import { Component, Input, OnInit } from '@angular/core';
import { UserOverview } from 'src/app/_models/user/user-overview';

@Component({
  selector: 'app-layout-card',
  templateUrl: './layout-card.component.html',
  styleUrls: ['./layout-card.component.css']
})
export class LayoutCardComponent implements OnInit {

  @Input() UserOverView: UserOverview;

  constructor() {
    this.UserOverView= new UserOverview();
   }
  ngOnChanges() {
    
  }
  ngOnInit(): void {
    
  }

}

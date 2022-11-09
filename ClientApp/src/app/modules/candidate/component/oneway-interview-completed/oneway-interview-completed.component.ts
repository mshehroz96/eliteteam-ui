
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-oneway-interview-completed',
  templateUrl: './oneway-interview-completed.component.html',
  styleUrls: ['./oneway-interview-completed.component.css']
})
export class OnewayInterviewCompletedComponent implements OnInit {

  constructor(private  authenticateService: AuthenticationService) { }
  name:any;
  ngOnInit(): void {
    this.name = this.authenticateService.currentUserValue.firstName;
  }

}

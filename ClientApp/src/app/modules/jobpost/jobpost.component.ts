import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user/user';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';


@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html',
  styleUrls: ['./jobpost.component.css']
})
export class JobpostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

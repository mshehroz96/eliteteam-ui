import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor() { }

  isCV : boolean = true;
  isContact : boolean = false;
  isPreferences : boolean = false;
  ngOnInit(): void {
  }

  activeCV(){
    this.isCV = true;
    this.isContact = false;
    this.isPreferences = false;
  }

  activeContact(){
    this.isCV = false;
    this.isContact = true;
    this.isPreferences = false;
  }

  activePreferences(){
    this.isCV = false;
    this.isContact = false;
    this.isPreferences = true;
  }

}

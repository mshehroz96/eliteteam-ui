import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unlocked-resume',
  templateUrl: './unlocked-resume.component.html',
  styleUrls: ['./unlocked-resume.component.css']
})
export class UnlockedResumeComponent implements OnInit {
  @Input()  resumeFileName : any = {};
  constructor() { }

  ngOnInit(): void {
  }

}

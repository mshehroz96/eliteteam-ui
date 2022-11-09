import { Component, OnInit } from '@angular/core';
import { OneWayInterviewTemplate } from 'src/app/_models/one-way-interview/one-way-interview-template';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';

@Component({
  selector: 'settings-interview-questions',
  templateUrl: './settings-interview-questions.component.html',
  styleUrls: ['./settings-interview-questions.component.css']
})
export class SettingsInterviewQuestionsComponent implements OnInit {

  templates:OneWayInterviewTemplate[]=[];
  constructor(private oneWayInterviewService:OneWayInterviewService) { }

  ngOnInit(): void {
    this.oneWayInterviewService.getInterviewTemplates().subscribe((res)=>
    {
      this.templates =res?.data;
    })
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-locked-resume',
  templateUrl: './locked-resume.component.html',
  styleUrls: ['./locked-resume.component.css']
})
export class LockedResumeComponent implements OnInit {
  @Input()  resumeFileName : any = {};

  constructor() { }
  fileName : any;
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  ngOnInit(): void {

  }

}

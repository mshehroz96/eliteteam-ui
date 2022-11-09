import { Component, Input, OnInit } from '@angular/core';
import { OneWayInterviewService } from 'src/app/_services';

@Component({
  selector: 'app-owi-rating',
  templateUrl: './owi-rating.component.html',
  styleUrls: ['./owi-rating.component.css']
})
export class OwiRatingComponent implements OnInit {

  @Input() applicantId:number=0;
  owiRating:any={};
  constructor(private owiService:OneWayInterviewService) { }

  ngOnInit() {

    this.owiService.getApplicantOneWayInterviewRating(this.applicantId).subscribe((res)=>{
      if(res.success)
      {
        this.owiRating=res.data;
      }
    })
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplicantResumeDetail, RedactDetail } from 'src/app/_models/recruitment/requisition-candidate';
import { RecruitmentService } from 'src/app/_services';

@Component({
  selector: 'app-applicant-resume',
  templateUrl: './applicant-resume.component.html',
  styleUrls: ['./applicant-resume.component.css']
})
export class ApplicantResumeComponent implements OnInit {

  
  redact: RedactDetail;
  private _applicantId:number=0;
  resumeDetails: ApplicantResumeDetail;
  @Output('redactChanged') redactChanged=new EventEmitter<RedactDetail>();

  @Input() set applicantId(value:number){
    this._applicantId=value;

    this.getApplicantResumeDetails();
  }

  get applicantId(){
    return this._applicantId;
  }

  constructor(private recruitmentService:RecruitmentService) {
    this.resumeDetails=new ApplicantResumeDetail();
    this.redact=new RedactDetail();
   }

  ngOnInit() {

    this.getDefaultRedact();

  }
  getDefaultRedact() {
    this.recruitmentService.getCandidateDefaultRedact().subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.redact = res.data;

        console.log(this.redact);
        this.redactChanged.emit(this.redact);
      }
    });
  }

  redactChange(event:any,section: string, field: string){
    console.log(section);

    switch (section) {
      case 'PersonalDetails':
        if(event.target.checked)
        {
          if(!this.redact.personalDetails.find(x=>x==field))
              this.redact.personalDetails.push(field);
        }
        else{
          this.redact.personalDetails.splice(this.redact.personalDetails.findIndex(x => x == field),1);
        }
        break;
      case 'WorkExperiences':
        console.log(event.target.checked);
        if (event.target.checked) {
          if (!this.redact.workExperiences.includes(field))
              this.redact.workExperiences.push(field);
        }
        else {
          this.redact.workExperiences.splice(this.redact.workExperiences.findIndex(x => x == field), 1);
        }
        break;
      case 'Educations':
        if (event.target.checked) {
          if (!this.redact.educations.includes(field))
            this.redact.educations.push(field);
        }
        else {
          this.redact.educations.splice(this.redact.educations.findIndex(x => x == field), 1);
        }
        break;
      case 'Certificates':
        if (event.target.checked) {
          if (!this.redact.certifications.includes(field))
            this.redact.certifications.push(field);
        }
        else {
          this.redact.certifications.splice(this.redact.certifications.findIndex(x => x == field), 1);
        }
        break;
      case 'Awards':
        if (event.target.checked) {
          if (!this.redact.awards.includes(field))
            this.redact.awards.push(field);
        }
        else {
          this.redact.awards.splice(this.redact.awards.findIndex(x => x == field), 1);
        }
        break;
      case 'Publications':
        if (event.target.checked) {
          if (!this.redact.publications.includes(field))
            this.redact.publications.push(field);
        }
        else {
          this.redact.publications.splice(this.redact.publications.findIndex(x => x == field), 1);
        }
        break;
      case 'Links':
        if (event.target.checked) {
          if (!this.redact.links.find(x => x == field))
            this.redact.links.push(field);
        }
        else {
          this.redact.links.splice(this.redact.links.findIndex(x => x == field), 1);
        }
        break;
      
    }

    this.redactChanged.emit(this.redact);

  }

  isRedacted(section:string,field:string):boolean
  {
    switch (section) {
      case 'PersonalDetails':
        return this.redact.personalDetails.includes(field);
      case 'WorkExperiences':
        return this.redact.workExperiences.includes(field);
      case 'Certificates':
        return this.redact.certifications.includes(field);
      case 'Educations':
        return this.redact.educations.includes(field);
      case 'Awards':
        return this.redact.awards.includes(field);
      case 'Publications':
        return this.redact.publications.includes(field);
      case 'Links':
        return this.redact.links.includes(field);
      default:
        return false;
    }
  }
  getApplicantResumeDetails() {
    this.recruitmentService.getApplicantResumeDetails(this.applicantId).subscribe((res)=>{
      if(res.success){
        this.resumeDetails=res.data;
      }
    });
  }
}

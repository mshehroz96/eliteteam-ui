import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplicantResumeDetail, RedactDetail } from 'src/app/_models/recruitment/requisition-candidate';
import { RecruitmentService } from 'src/app/_services';

@Component({
  selector: 'app-applicant-resume-redacted',
  templateUrl: './applicant-resume-redacted.component.html',
  styleUrls: ['./applicant-resume-redacted.component.css']
})
export class ApplicantResumeRedactedComponent implements OnInit {
  
  private _applicantId: number = 0;
  resumeDetails: ApplicantResumeDetail;
  @Input() set applicantId(value: number) {
    this._applicantId = value;

    this.getApplicantResumeDetails();
  }

  get applicantId() {
    return this._applicantId;
  }

  private _redact!: RedactDetail;
  @Input() set redact(value: RedactDetail) {
    this._redact = value;
  }

  get redact() {
    return this._redact;
  }

  constructor(private recruitmentService: RecruitmentService) {
    this.resumeDetails = new ApplicantResumeDetail();
    this._redact = new RedactDetail();
  }

  ngOnInit() {

  }
  isRedacted(section: string, field: string): boolean {
    switch (section) {
      case 'PersonalDetails':
        return this.redact.personalDetails.includes(field);
      case 'WorkExperiences':
        return this.redact.workExperiences.includes(field);
      case 'Educations':
        return this.redact.educations.includes(field);
      case 'Certificates':
        return this.redact.certifications.includes(field);
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
    this.recruitmentService.getApplicantResumeDetails(this.applicantId).subscribe((res) => {
      if (res.success) {
        this.resumeDetails = res.data;
      }
    });
  }
}

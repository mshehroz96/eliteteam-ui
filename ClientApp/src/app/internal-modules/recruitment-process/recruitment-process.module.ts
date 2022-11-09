import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantOverviewComponent } from './components/candidates/applicant-overview/applicant-overview.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { CandidateOverviewComponent } from './components/candidates/candidate-overview/candidate-overview.component';
import { PaginatorModule } from 'primeng/paginator';
import { CoreModule } from 'src/app/core/core.module';
import { RatingModule } from 'primeng/rating';
import { RouterModule } from '@angular/router';
import { ApplicantApplicationComponent } from './components/candidates/applicant-application/applicant-application.component';
import { ApplicantActivityComponent } from './components/candidates/applicant-activity/applicant-activity.component';
import { ApplicantResumeComponent } from './components/candidates/applicant-resume/applicant-resume.component';
import { InterviewInviteComponent } from './components/candidates/interview-invite/interview-invite.component';
import { OwiQuestionsComponent } from './components/candidates/owi-questions/owi-questions.component';
import { OwiAnswerDetailsComponent } from './components/candidates/owi-answer-details/owi-answer-details.component';
import { OwiAnswersComponent } from './components/candidates/owi-answers/owi-answers.component';
import { CandidatePageviewComponent } from './components/candidates/candidate-pageview/candidate-pageview.component';
import { InterviewDetailsComponent } from './components/candidates/interview-details/interview-details.component';
import { CalendarModule } from 'primeng/calendar';
import { OwiRatingComponent } from './components/candidates/owi-rating/owi-rating.component';
import { SendOfferComponent } from './components/candidates/send-offer/send-offer.component';
import { EditorModule } from 'primeng/editor';
import { CancelInterviewComponent } from './components/candidates/cancel-interview/cancel-interview.component';
import { ClientInterviewInviteComponent } from './components/candidates/client-interview-invite/client-interview-invite.component';
import { ClientReviewComponent } from './components/candidates/client-review/client-review.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ZoomMeetingModule } from '../zoom-meeting/zoom-meeting.module';
import { ClientInterviewDetailsComponent } from './components/candidates/client-interview-details/client-interview-details.component';
import { OfferDetailComponent } from './components/candidates/offer-detail/offer-detail.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { QualifyCandidateComponent } from './components/candidates/qualify-candidate/qualify-candidate.component';
import { ApplicantResumeRedactedComponent } from './components/candidates/applicant-resume-redacted/applicant-resume-redacted.component';
import { LiveInterviewComponent } from './components/candidates/live-interview/live-interview.component';
import { InPersonMeetingComponent } from './components/candidates/in-person-meeting/in-person-meeting.component';
import { RequisitionModule } from '../requisition/requisition.module';

@NgModule({
  declarations: [
    ApplicantActivityComponent,
    ApplicantApplicationComponent,
    ApplicantOverviewComponent,
    ApplicantResumeComponent,
    CandidateOverviewComponent,
    CandidatesComponent,
    InterviewInviteComponent,
    OwiQuestionsComponent,
    OwiAnswerDetailsComponent,
    OwiAnswersComponent,
    CandidatePageviewComponent,
    InterviewDetailsComponent,
    OwiRatingComponent,
    SendOfferComponent,
    CancelInterviewComponent,
    ClientInterviewInviteComponent,
    ClientReviewComponent,
    ClientInterviewDetailsComponent,
    OfferDetailComponent,
    QualifyCandidateComponent,
    ApplicantResumeRedactedComponent,
    LiveInterviewComponent,
    InPersonMeetingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PaginatorModule,
    CoreModule,
    RatingModule,
    CalendarModule,
    EditorModule,
    OverlayPanelModule,
    FullCalendarModule,
    ZoomMeetingModule,
    MultiSelectModule,
    RequisitionModule
  ],
  exports:[
    ApplicantActivityComponent,
    ApplicantApplicationComponent,
    ApplicantOverviewComponent,
    ApplicantResumeComponent,
    CandidateOverviewComponent,
    CandidatesComponent,
    InterviewInviteComponent,
    OwiQuestionsComponent,
    OwiAnswerDetailsComponent,
    OwiAnswersComponent,
    CandidatePageviewComponent,
    InterviewDetailsComponent,
    OwiRatingComponent,
    SendOfferComponent,
    CancelInterviewComponent,
    ClientInterviewInviteComponent,
    ClientReviewComponent,
    ClientInterviewDetailsComponent,
    OfferDetailComponent,
    QualifyCandidateComponent,
    ApplicantResumeRedactedComponent,
    LiveInterviewComponent,
    InPersonMeetingComponent,
  ]
})
export class RecruitmentProcessModule { }

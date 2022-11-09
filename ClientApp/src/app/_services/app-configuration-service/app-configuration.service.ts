import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {

  config: any = [

    {
      "selector": "app-applicant-profile",
      "rules": [
        {
          "status": "New Applicant",
          "campaignType": ["Video", "Resume","Interview"],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-indeed-application",
            "btn-disqualify",
            "btn-invite-for-interview"
          ]
        },
        {
          "status": "New Candidate",
          "campaignType": ["Video", "Resume", "Interview"],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-indeed-application",
            "app-owi-answers",
            "app-owi-answer-details",
            "btn-qualify",
            "btn-disqualify"
          ]
        },
        {
          "status": [
            "Recruiter Zoom Interview Cancelled",
            "Recruiter Zoom Interview Requested",
            "Recruiter Zoom Interview Scheduled",
            "Recruiter Zoom Interview Started",
            "Client Zoom Interview Requested",
            "Client Zoom Interview Scheduled",
            "Client Zoom Interview Started",
            "Rescheduled Candidate Zoom Interview",
            "One-Way Interview Requested",
            "One-Way Interview Pending",
            "Client In-Person Interview Requested",
            "Client In-Person Interview Cancelled",
            "Client In-Person Interview Scheduled",
            "Client In-Person Interview Completed"
          ],

          "campaignType": [
            "Video",
            "Resume",
            "Interview"
          ],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-indeed-application",
            "app-owi-answers",
            "app-owi-answer-details",
            "app-interview-details",
            "btn-cancel-interview",
            "btn-reschedule-interview",
          ]
        },
        {
          "status": [
            "Candidate Unlocked"
          ],

          "campaignType": [
            "Video",
            "Resume",
            "Interview"
          ],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-indeed-application",
            "btn-invite-for-interview"
          ]
        },
        {
          "status": ["Disqualified"],
          "campaignType": ["Video","Resume","Interview"],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-indeed-application",
            "btn-invite-for-interview"
          ]
        },
        {
          "status": ["Qualified"],
          "campaignType": ["Video"],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-indeed-application",
            "app-owi-answers",
            "app-owi-answer-details",
            "btn-invite-for-interview",
            "btn-disqualify"
          ]
        },
        {
          "status": ["Qualified"],
          "campaignType": ["Resume","Interview"],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-indeed-application",
            "btn-invite-for-interview",
            "btn-disqualify"
          ]
        }
      ]
    },
    {
      "selector": "app-candidate-profile",
      "rules": [
        {
          "status": [
            "Qualified",
            "Client In-Person Interview Cancelled",
          ],
          "campaignType": [
            "Video"
          ],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-owi-answers",
            "app-resume-details",
            "app-owi-answer-details",
            "btn-invite-for-interview",

            "btn-send-offer",
          ]
        },
        {
          "status": [
            "Qualified",
          ],
          "campaignType": [
            "Resume",
            "Interview"
          ],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-resume-details",
            "btn-invite-for-interview",
            "btn-send-offer",
          ]
        },
        {
          "status": [
            "Client Zoom Interview Requested",
            "Client Zoom Interview Scheduled",
            "Client In-Person Interview Requested",
            "Client In-Person Interview Scheduled",

          ],
          "campaignType": [
            "Video",
            "Resume",
            "Interview"
          ],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-resume-details",
            "app-client-interview-details",
            "btn-reschedule-interview",
            "btn-cancel-interview",
          ]
        },
        {
          "status": [
            "Client Zoom Interview Started",
            "Client Zoom Interview Completed",
            "Client In-Person Interview Completed"
          ],
          "campaignType": [
            "Video",
            "Resume",
            "Interview"
          ],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-resume-details",
            "app-client-interview-details",
            "app-owi-answer-details",
            "app-owi-answers",
            "app-owi-rating",
            "app-interview-comments",
            "btn-invite-for-interview",
            "btn-send-offer"
          ]
        },
        {
          "status": [
            "Client Offer Sent",
            "Candidate Offer Accepted",
            "Candidate Offer Rejected",
            "Candidate Rejected"
          ],
          "campaignType": [
            "Video",
            "Resume",
            "Interview"
          ],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-resume-details",
            "app-offer-detail",
            "app-owi-answer-details",
            "app-owi-answers",
            "app-owi-rating",
            "app-interview-comments",
            "btn-retract-offer",
            "btn-change-offer",
            "btn-hire",
          ]
        },
        {
          "status": [
            "Hired",
          ],
          "campaignType": [
            "Video",
            "Resume",
            "Interview"
          ],
          "templates": [
            "app-requisition-summary",
            "app-chat-messages",
            "app-resume-details",
            "app-offer-detail",
            "app-owi-answer-details",
            "app-owi-answers",
            "app-owi-rating",
            "app-interview-comments",
          ]
        }
      ]
    },
    {
      "selector": "app-chat-messages",
      "rules": [
        {
          "userType": "Recruiter",
          "parent": "app-applicant-profile",
          "templates": [
            "btn-common-chat",
            "btn-private-applicant",
            "btn-private-client",
            "form-send-message",
            "channel-all",
            "channel-chat",
            "channel-sms",
            "channel-email",
            "channel-whatsapp",
          ]
        }
      ]
    },
    {
      "selector": "app-chat-messages",
      "rules": [
        {
          "userType": "Client,ClientAdmin",
          "parent": "app-chat",
          "templates": [
            "form-send-message",
            "channel-all",
            "channel-chat",
            "channel-sms",
            "channel-email",
            "channel-whatsapp",
          ]
        }
      ]
    }
  ];

  constructor() {
  }

}

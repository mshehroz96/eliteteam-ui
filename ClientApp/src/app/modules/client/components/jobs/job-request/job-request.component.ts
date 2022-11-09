import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { event } from 'jquery';
import { MenuItem } from 'primeng/api/menuitem';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-request',
  templateUrl: './job-request.component.html',
  styleUrls: ['./job-request.component.css']
})
export class JobRequestComponent implements OnInit {
  uuid: string = '';
  action?:string='';
  activeIndex: number = 0;
  readonly:boolean=true;
  requisitionRequest:RequisitionRequest=new RequisitionRequest();
  constructor(
    public loadingService:LoadingService,
    private route: ActivatedRoute, 
    private router:Router,
    public requisitionRequestService: RequisitionRequestService) {


    this.requisitionRequest = new RequisitionRequest();
    this.requisitionRequestService.activeStepIndex.next(this.activeIndex);
    this.requisitionRequestService.requisitionRequest$.next(this.requisitionRequest);

    this.uuid = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['action'];

    if (this.uuid!='0' && this.uuid.length > 0) {
      
      this.loadingService.doLoading(
        this.requisitionRequestService.getRequisition(this.uuid),this
      ).subscribe((res) => {
        if (res?.success) {
          this.requisitionRequest = res.data;
          this.requisitionRequest.showJobDescription = true;
          this.requisitionRequest.showPosition = true;
          this.requisitionRequest.showAttachment = true;
          this.requisitionRequest.showSchedule = true;

          if (this.action && this.action == 'edit')
            this.readonly=false;

            
          if (this.action && this.action =='clone')
          {
            this.requisitionRequest.requisitionId = 0;
            this.requisitionRequest.uuid='';
            this.uuid='';
            this.readonly=false;

            if(this.requisitionRequest.screeningQuestions)
            {
              this.requisitionRequest.screeningQuestions.map((x)=>
              {
                x.requisitionScreeningQuestionId=0;
                return x;
              });
            }
          }

          this.requisitionRequestService.requisitionRequest$.next(this.requisitionRequest); 
          
        }
      });
    }
  }

  items!: MenuItem[];

  subscription!: Subscription;

  ngOnInit() {

    
    this.items = [{
      label: 'Basic',
      command: (event: any) => {
        this.requisitionRequestService.activeStepIndex.next(0);
      }
    },
    {
      label: 'Details',
      command: (event: any) => {
        this.requisitionRequestService.activeStepIndex.next(1);
      }
    },
    {
      label: 'Compensation',
      command: (event: any) => {
        this.requisitionRequestService.activeStepIndex.next(2);
      }
    },
    {
      label: 'Screening',
      command: (event: any) => {
        this.requisitionRequestService.activeStepIndex.next(3);
      }
    },
    {
      label: 'Review',
      command: (event: any) => {
        this.requisitionRequestService.activeStepIndex.next(4);
      }
    }
    ];

    this.requisitionRequestService.activeStepIndex.subscribe((step: number) => {
      this.activeIndex = step;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
    this.requisitionRequestService.destroy();
  }
  
  saveDraftJob() {
    
    this.requisitionRequest.isDraft=true;
    
    this.loadingService.doLoading(
      this.requisitionRequestService.createOrUpdateRequisition(this.requisitionRequest),this
    )
    .subscribe((res: any) => {
        if (res?.success) {
          Swal.fire({
            title: 'Job Updated',
            text: "Your changes have been saved successfully.",
            icon: 'success'
          }).then(() => 
          {
              this.router.navigate(['/client/jobs']);
          });
        }
    });
  }
  cancel()
  {
    this.router.navigate(['/client/jobs']);
  }
}

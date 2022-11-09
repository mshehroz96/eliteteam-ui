import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LIST_TYPES } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { OfferDetail } from 'src/app/_models/recruitment/requisition-candidate';
import { RecruitmentService, CommonService } from 'src/app/_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-offer',
  templateUrl: './send-offer.component.html',
  styleUrls: ['./send-offer.component.css']
})
export class SendOfferComponent implements OnInit {
  applicantId: number = 0;
  requisitionId: number = 0;
  campaignType: string = '';
  offer!: OfferDetail;
  offerTemplates: any[] = [];
  minDate!: Date;
  templatePreview: string = '';
  workMode:boolean=false;
  constructor(
    public loadingService: LoadingService,
    private recruitmentService: RecruitmentService,
    private commonService: CommonService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {

    this.offer=new OfferDetail();
    
  }

  ngOnInit() {

    this.applicantId = Number(this.config.data.id);
    this.requisitionId = this.config.data.requisitionId;
    this.campaignType = this.config.data.campaignType;
    this.minDate = this.getRoundedDate(5);

    this.offer.requisitionCandidateId = this.applicantId;

    this.getOfferTemplates();
  }
  getRoundedDate(minutes: number, d = (new Date())) {

    let ms = 1000 * 60 * minutes;

    let roundedDate = new Date(Math.round(d.getTime() / ms) * ms);

    return roundedDate
  }
  setWorkMode(){
    if(this.workMode==true)
      this.offer.workMode='Remote Working'
    else
      this.offer.workMode='';
  }
  
  offerTemplateChange() {
    this.templatePreview = this.offerTemplates.find((x)=>x.value==this.offer.clientOfferLetterTemplateId).description;
  }
  getOfferTemplates() {
    this.commonService.getOfferTemplates().subscribe((res) => {
      if (res.success) {
        this.offerTemplates = res.data;
      }
    });
  }
  closeModel() {
    if (this.ref) {
      this.ref.close();
    }
  }

  sendOffer() {

    console.log(this.offer);

    this.loadingService.doLoading(
      this.recruitmentService.sendOfferToApplicant(this.offer), this
    ).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'Offer',
          text: 'Offer has been sent',
          icon: 'success',
        });

        this.ref.close({});
      }
    });
  }
}


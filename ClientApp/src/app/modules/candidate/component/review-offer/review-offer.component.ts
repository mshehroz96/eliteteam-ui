import { CandidateOfferInput } from './../../../../_models/candidate/candidate';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-review-offer',
  templateUrl: './review-offer.component.html',
  styleUrls: ['./review-offer.component.css']
})
export class ReviewOfferComponent implements OnInit {
  @Input() requisitionId : any;
  @Output() hideOffer = new EventEmitter<any>();
  constructor(
    private candidateService : CandidateService
  ) { }

  candidateOffer : CandidateOfferInput =  {};
  remarks : any;
  blocked : boolean= false;

  ngOnInit(): void {
    console.log('a');
  }


  rejectOffer(){
    Swal.fire({
      title: 'Confirm',
      text: "Are you sure you want to reject this offer?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.candidateOffer.requisitionCandidateStatusLIID = 279;
        this.updateOfferStatus();
      }
    })
  }

  acceptOffer(){
    this.candidateOffer.requisitionCandidateStatusLIID = 278;
    this.updateOfferStatus();
  }

  updateOfferStatus(){
    this.blocked = true;
    this.candidateOffer.remarks = this.remarks;
    this.candidateOffer.requisitionId =  this.requisitionId;
    this.candidateOffer.candidateUserId =  0;

    this.candidateService.updateCandidateOffer(this.candidateOffer).subscribe((res) => {
      if(res?.success){
        this.blocked = false;
        this.hideOffer.next({});
        Swal.fire({
          icon: 'success',
          title: res.data.title,
          text: res.data.message,
        });
      }
  });
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvatarPipe } from 'src/app/core/pipe/avatar/avatar.pipe';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../../../_services/authentication/authentication.service';
import { EventService } from 'src/app/_services/event/event.service';


@Component({
  selector: 'app-candidate-interview-view',
  templateUrl: './candidate-interview-view.component.html',
  styleUrls: ['./candidate-interview-view.component.css']
})
export class CandidateInterviewViewComponent implements OnInit {

  @Input() eventData : any;
  @Output() hdieRighPanel = new EventEmitter<any>();
  series : number = 1;
  candidate : any;
  label : any;
  blocked : boolean = false;
  constructor(private authenticationService : AuthenticationService,private eventService: EventService) { }

  ngOnInit(): void {
      console.log(this.eventData);
      this.candidate = this.eventData.participants.find((obj: { participantRole: string; }) => {
        return obj.participantRole == "Candidate";
      });
  }

  onRemoveEvent()
  {
    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this schedule?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.blocked = true;
        this.eventService.cancelledEvent(parseInt(this.eventData.eventId)).subscribe((res) => {
          if(res?.success){
            this.blocked = false;
            this.hdieRighPanel.next({});
          }
        });

      }
    })
  }

}

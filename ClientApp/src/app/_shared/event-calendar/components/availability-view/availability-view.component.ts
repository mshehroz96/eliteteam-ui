import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { EventService } from 'src/app/_services/event/event.service';

@Component({
  selector: 'app-availability-view',
  templateUrl: './availability-view.component.html',
  styleUrls: ['./availability-view.component.css']
})
export class AvailabilityViewComponent implements OnInit {

  constructor(private eventService : EventService) { }
  @Input() eventData : any;
  @Output() hdieRighPanel = new EventEmitter<any>();
  series : number = 1;
  blocked : boolean = false;
  ngOnInit(): void {

  }


  onRemoveEvent()
  {
    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this schedule?",
      icon: 'question',
      showCancelButton: true,
      customClass: { confirmButton:"disqualify"},
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.blocked = true;
        this.eventService.deleteEvent(parseInt(this.eventData.eventId)).subscribe((res) => {
          this.blocked = false;
          if(res?.success){
            this.hdieRighPanel.next({'isRefresh':true});
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Sorry, you cannot delete this availability slot as there is one or more event(s) scheduled for it already. You can Cancel/Reschedule the event(s) first and then Delete this availability slot.',
            });
          }
        });

      }
    })
  }

  onRemoveAllEvent()
  {
    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete All schedule releated to this schedule?",
      icon: 'question',
      showCancelButton: true,
      customClass: { confirmButton:"disqualify"},
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.blocked = true;
        this.eventService.deleteAllEvent(this.eventData.seriesId).subscribe((res) => {
          this.blocked = false;
          if(res?.success){
            this.hdieRighPanel.next({});
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Sorry, you cannot delete this availability series as there is one or more event(s) scheduled for it already. You can Cancel/Reschedule the event(s) first and then Delete this series or you can delete individual day slots one by one which do not have an event assigned to them yet.',
            });
          }
        });

      }
    })
  }



}

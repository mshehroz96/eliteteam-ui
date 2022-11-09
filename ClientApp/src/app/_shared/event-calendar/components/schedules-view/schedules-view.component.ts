import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedules-view',
  templateUrl: './schedules-view.component.html',
  styleUrls: ['./schedules-view.component.css']
})
export class SchedulesViewComponent implements OnInit {

  constructor(private eventService : EventService) { }
  @Input() eventData : any;
  @Output() hdieRighPanel = new EventEmitter<any>();
  series : number = 1;
  blocked : boolean = false;
  ngOnInit() {
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
        this.eventService.deleteEvent(parseInt(this.eventData.eventId)).subscribe((res) => {
          if(res?.success){
            this.blocked = false;
            this.hdieRighPanel.next({'isRefresh':true});
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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.blocked = true;
        this.eventService.deleteAllEvent(this.eventData.seriesId).subscribe((res) => {
          if(res?.success){
            this.blocked = false;
            this.hdieRighPanel.next({});
          }
        });

      }
    })
  }


}

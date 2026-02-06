import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/_services';
import { IJobDetails } from './job-details2/job-interface';

@Component({
  selector: 'app-jobs-active2',
  templateUrl: './jobs-active2.component.html',
  styleUrls: ['./jobs-active2.component.css']
})
export class JobsActive2Component implements OnInit {
  jobs: IJobDetails[] = [];
  clients : any[] = [];
  selectedClient : number = 0;
  searchKeyword : string = '';
  constructor(private recriterService: RecruiterService) { }

  ngOnInit(): void {
   this.getActiveJobs();
   this.getClients();
  }

  getActiveJobs() {
      let obj = {
        filter1 : 0, filters : {}, first : 0, globalFilter : "", listType : "Empty", rows : 10, searchKeyword : "", sortOrder : 1
      }
      this.recriterService.getActiveJobs(obj).subscribe(x=> {
        debugger;

          if(x?.success)
          {
              this.jobs = x.data;
          }
      })
  }

  getClients()
  {
      this.recriterService.getClients().subscribe(res=> {
          if(res?.success)
          {
              this.clients = res.data ?? [];
          }
      })
  }

}

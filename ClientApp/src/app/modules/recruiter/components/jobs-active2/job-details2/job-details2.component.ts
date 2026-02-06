import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RecruiterService } from 'src/app/_services';
import { IJobDetails } from './job-interface';

@Component({
  selector: 'app-job-details2',
  templateUrl: './job-details2.component.html',
  styleUrls: ['./job-details2.component.css']
})
export class JobDetails2Component implements OnInit {
  jobId : string = '';
  jobs : any[] = [];
  candiates  : any[] = [];
  currentJob : any;
  constructor(private route: ActivatedRoute, private recruiterService: RecruiterService) {
    this.jobId = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.getJobDetails();
  }

  getJobDetails()
  {
    
    let obj = {
      filters : [], first : 0, requisitionUuid : this.jobId, rows : 9, status : "All"
    }

      this.recruiterService.getJobDetails(obj).subscribe(res=> {
          if(res?.success)
          {
            this.jobs = res.data.requisitionsStats;
            this.candiates = res.data.candidates;
            this.currentJob = this.jobs.find(job => job.uuid === this.jobId);
          }
      });
  }

}

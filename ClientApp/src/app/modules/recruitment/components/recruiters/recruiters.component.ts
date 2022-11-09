import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/_services/recruiter/recruiter.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { recruiterRMFilter } from 'src/app/_models/recutiter/recruiterRMList';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FILES_PATHS } from 'src/app';


@Component({
  selector: 'recruiters',
  templateUrl: './recruiters.component.html',
  styleUrls: ['./recruiters.component.css']
})
export class RecruitersComponent implements OnInit {

  loading: boolean = false;
  totalRecords: number = 0;
  searchFilter: string = "";
  recruiters: any[] = [];
  strUserAvatarURL:string = "";
  searchForm = this.fb.group({
		dateRange: [""],
    recruiterName: [""]
	});
  autoCompleteResults: any[] = [];
  noRecord:boolean = false;
  constructor(
    private readonly recruiterService: RecruiterService,
    private fb: FormBuilder,
    private readonly commonService: CommonService,
		private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getRecruiters();
  }

  getRecruiters() {
    this.loading = true;
    var dateRange = "";
    var sd = "";
    var ed = "";
    if(this.searchForm.value.dateRange){
      var startDate = new Date(this.searchForm.value.dateRange[0]);
      sd = this.datePipe.transform(startDate, "dd-MM-yyyy") + "";
      var endDate = new Date(this.searchForm.value.dateRange[1]);
      ed = this.datePipe.transform(endDate,"dd-MM-yyyy") + "";
    }
    var recruiterId = 0;
    if(this.searchForm.value.recruiterName){
      recruiterId = this.searchForm.value.recruiterName.userID;
    }
    this.recruiterService.getRecruiters(sd.toString(),ed.toString(),recruiterId).subscribe((res) => {
      
      if (res?.success) {
        this.recruiters = res?.data;

        //this.recruiters = this.recruiters.filter

        for (let i = 0; i < this.recruiters.length; i++) {
          this.recruiters[i].strAvatar = FILES_PATHS.MAP_USER_AVATARS(this.recruiters[i].avatarfilename);
        }
        this.totalRecords = res?.totalRecords;
        this.loading = false;
        if(this.recruiters.length == 0){
          this.noRecord = true;
        }
      }
    });
  }
  
  searchRecruiters(event: any) {
    this.recruiterService.searchRecruiter(event.query).subscribe((res: any) => {
      if (res?.success) {
        this.autoCompleteResults = res?.data;
      }
    });
  }
  tConvert (time:string) {
    const timeString = time + ':00:00'
    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z').toLocaleTimeString('en-US',
    {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});
    var aa  = timeString12hr.split(' ')[0];
    var bb = aa.split(':')[0];
    return bb;
  }
  getActivityClass (obj:any) {
    var cl = "";
    if(obj.activityLevel){
      cl= "text-center small py-1 px-1 bg-success-light"
    }
    else{
      cl= "text-center small py-1 px-1"
    }
    return cl
  }
  getActivityClassText (obj:any) {
    var cl = "";
    switch(obj.activityLevel) { 
      case '': { 
        cl = "bx bxs-circle bx-xs text-secondary";
         break; 
      } 
      case 'Red': { 
        cl = "bx bxs-circle bx-xs text-danger";
         break; 
      } 
      case 'Yellow': { 
        cl = "bx bxs-circle bx-xs text-warning";
         break; 
      } 
      case 'Green': { 
         cl = "bx bxs-circle bx-xs text-success";
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   } 
    return cl
  }
  getActivityToolTip (obj:any) {
    var cl = "";
    switch(obj.activityLevel) { 
      case '': { 
        cl = "No Activity";
         break; 
      } 
      case 'Red': { 
        cl = "Low Activity";
         break; 
      } 
      case 'Yellow': { 
        cl = "Medium Activity";
         break; 
      } 
      case 'Green': { 
         cl = "High Acitivity";
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   } 
    return cl
  }
}

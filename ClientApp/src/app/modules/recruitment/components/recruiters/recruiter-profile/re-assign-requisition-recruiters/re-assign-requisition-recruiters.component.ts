import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/_services/recruiter/recruiter.service';

@Component({
  selector: 'app-re-assign-requisition-recruiters',
  templateUrl: './re-assign-requisition-recruiters.component.html',
  styleUrls: ['./re-assign-requisition-recruiters.component.css']
})
export class ReAssignRequisitionRecruitersComponent implements OnInit {

  public tabType: string = 'reassign-clients';
  public menuList: [{ Name: string; RouteName: string; Icon: string }];
  selected: string='Re-Assign Client(s)';
  constructor(private readonly recruiterService: RecruiterService) {
    this.menuList = [{ Name: '', RouteName: '', Icon: '' }];
    this.recruiterService.selected = this.selected;
   }

  ngOnInit(): void {
    this.menuList.splice(0, this.menuList.length);
    this.menuList.push({
      Name: 'Re-Assign Client(s)',
      RouteName: 'reassign-clients',
      Icon: '',
    });
    this.menuList.push({
      Name: 'Re-Assign Job(s)',
      RouteName: 'reassign-jobs',
      Icon: '',
    });
  }
  loadTab(item: any, tabType: string, event:any) {
    event.preventDefault();
    if (tabType != null && tabType != '') {
      this.selected = item.Name;
      this.recruiterService.selected = item.Name;
      this.tabType = tabType;
    }
  }

  isActive(item: any) {
    return ['nav-link' ,'fill-li',  this.selected === item.Name ? 'active' : ''];
  }

}
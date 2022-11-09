import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/_services';

@Component({
  selector: 'app-recruiter-jobs',
  templateUrl: './recruiter-jobs.component.html',
  styleUrls: ['./recruiter-jobs.component.css']
})
export class RecruiterJobsComponent implements OnInit {

  public tabType: string = 'active-jobs';
  public menuList: [{ Name: string; RouteName: string; Icon: string }];
  selected: string='Active Jobs';
  constructor(private readonly recruiterService: RecruiterService) {
    this.menuList = [{ Name: '', RouteName: '', Icon: '' }];
    this.recruiterService.selected = this.selected;
   }

  ngOnInit(): void {
    this.menuList.splice(0, this.menuList.length);
    this.menuList.push({
      Name: 'Active Jobs',
      RouteName: 'active-jobs',
      Icon: '',
    });
    this.menuList.push({
      Name: 'Inactive Jobs',
      RouteName: 'inactive-jobs',
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

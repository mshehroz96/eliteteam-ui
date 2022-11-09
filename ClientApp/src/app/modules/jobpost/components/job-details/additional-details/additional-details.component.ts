import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LIST_TYPES } from 'src/app';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { CommonService } from 'src/app/_services/common/common.service';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.css']
})
export class AdditionalDetailsComponent implements OnInit {


  noOfPositions: any[] = [];
  hiringUrgencies: any = [];
  performRemotely: any[] = [];
  primaryLocations: any[] = [];
  jobTypes: any[] = [];
  jobSchedules: any[] = [];

  requisitionRequest: RequisitionRequest;
  constructor(
    private requisitionRequestService: RequisitionRequestService,
    private readonly commonService: CommonService
  ) {
    this.requisitionRequest = this.requisitionRequestService.requisitionRequest;
  }


  ngOnInit(): void {
    this.getNoOfPositions();
    this.getHiringUrgencies();
    this.getPrimaryLocations();
    this.getPerformRemotely();
    this.getJobTypes();
    this.getSchedules();
  }
  applyToAll(customSchedule: any) {
    this.requisitionRequest.customJobSchedule.filter(x => x.day != 'Sat' && x.day != 'Sun').forEach((data) => {
      data.startTime = customSchedule.startTime;
      data.endTime = customSchedule.endTime;
      data.selected = true;
    });
  }
  clearSelection(customJobSchedule: any) {
    if (!customJobSchedule.selected) {
      customJobSchedule.startTime = '';
      customJobSchedule.endTime = '';
    }
  }
  getWeeklyHours(): number {
    var _totalDuration = 0;

    this.requisitionRequest.customJobSchedule.filter(x => x.selected).forEach((data) => {

      if (data.startTime && data.endTime) {
        var startTime = moment(data.startTime, 'HH:mm:ss a');
        var endTime = moment(data.endTime, 'HH:mm:ss a');

        var duration = moment.duration(endTime.diff(startTime));

        _totalDuration = _totalDuration + duration.asHours();
      }

    });

    return _totalDuration;
  }
  getTimeDifference(customSchedule: any): number {
    if (customSchedule.startTime && customSchedule.endTime) {
      var startTime = moment(customSchedule.startTime, 'HH:mm:ss a');
      var endTime = moment(customSchedule.endTime, 'HH:mm:ss a');

      var duration = moment.duration(endTime.diff(startTime));

      return duration.asHours();
    }
    else
      return 0;
  }
  getSchedules() {
    this.commonService.getListItems(LIST_TYPES.REQUISITION_JOB_SCHEDULE).subscribe((res: any) => {
      if (res?.success) {
        this.jobSchedules = res?.data;
      }
    });
  }
  getJobTypes() {
    this.commonService.getListItems(LIST_TYPES.REQUISITION_JOB_TYPE).subscribe((res: any) => {
      if (res?.success) {
        this.jobTypes = res?.data;
      }
    });
  }
  getPrimaryLocations() {
    this.commonService.getListItems(LIST_TYPES.REQUISITION_PRIMARILY_LOCATION).subscribe((res: any) => {
      if (res?.success) {
        this.primaryLocations = res?.data;
      }
    });
  }
  getPerformRemotely() {
    this.commonService.getListItems(LIST_TYPES.REQUISITION_PERFORM_REMOTELY).subscribe((res: any) => {
      if (res?.success) {
        this.performRemotely = res?.data;
      }
    });
  }
  isCustomSchedule(): boolean {
    return this.requisitionRequest.jobSchedule.find(x => x.displayText == 'Custom Schedule')
  }
  getNoOfPositions() {
    this.commonService.getListItems(LIST_TYPES.NO_OF_POSITIONS).subscribe((res: any) => {
      if (res?.success) {
        this.noOfPositions = res?.data;
      }
    });
  }
  getHiringUrgencies() {
    this.commonService.getListItems(LIST_TYPES.REQUISITION_HIRING_URGENCY).subscribe((res: any) => {
      if (res?.success) {
        this.hiringUrgencies = res?.data;
      }
    });
  }

  jobScheduleChange() {
    if (this.isCustomSchedule()) {
      if (this.requisitionRequest.customJobSchedule.length == 0) {
        this.requisitionRequest.customJobSchedule = [
          { day: "Mon", startTime: "", endTime: "", selected: false },
          { day: "Tue", startTime: "", endTime: "", selected: false },
          { day: "Wed", startTime: "", endTime: "", selected: false },
          { day: "Thr", startTime: "", endTime: "", selected: false },
          { day: "Fri", startTime: "", endTime: "", selected: false },
          { day: "Sat", startTime: "", endTime: "", selected: false },
          { day: "Sun", startTime: "", endTime: "", selected: false }
        ];
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ThresholdsFilters } from 'src/app/_models/threshold/thresholdsFilters';
import { ThresholdService } from 'src/app/_services/threshold/threshold.service';
import { EditThresholdValuesComponent } from './edit-threshold-values/edit-threshold-values.component';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-threshold-settings',
  templateUrl: './threshold-settings.component.html',
  styleUrls: ['./threshold-settings.component.css']
})
export class ThresholdSettingsComponent implements OnInit {
  

  totalRecords: number = 0;
  searchFilter: string = '';
  thresholdList: any[] = [];
  loading:boolean = false;
  ref!: DynamicDialogRef;
  constructor(private dialog: MatDialog, private service:ThresholdService,private dialogService: DialogService) { }

  ngOnInit() {
    
  }
  getAll(params: ThresholdsFilters) {
    this.loading = true;
    params.globalFilter = this.searchFilter;
    params.searchKeyword = this.searchFilter;
    this.service.getAllThresholds(params).subscribe((res) => {
      if (res?.success) {
        this.thresholdList = res?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
  }
  // editThresholdValues(obj:any) {
    
  //   this.ref = this.dialogService.open(EditThresholdValuesComponent, {
  //     header: 'Edit Threshold Values',
  //     data: {
  //       obj: obj,
  //     },
  //     width: '50%',
  //     contentStyle: { "max-height": "1000px", "overflow": "auto" },
  //     baseZIndex: 10000
  //   });

  //   // this.ref.onClose.subscribe((template: any) => {
  //   //   this.oneWayInterviewService.getInterviewQuestions(this.selectedTemplate.oneWayInterviewTemplateId).subscribe((res) => {
  //   //     this.questions = res?.data;
  //   //   });
  //   // }); 

  // }
  editThresholdValues(item: any)
  {
    this.thresholdList.map((x) =>

      {
        if (x.thresholdID == item.thresholdID) {
            x.selected=!item.selected;
        }

        return x;
      }
        
    );
    
  }
  saveThreshold(){
    this.loading = true;
    var selectedList = this.thresholdList.filter(x=>x.selected);
    selectedList.forEach(function(item, i) { 
      if (item.thresholdInputType == "Number"){
        item.value1 = item.value1 + "";
      } 
      if (item.thresholdInputType == "NumberRange"){
        item.value1 = item.value1 + "";
        item.value2 = item.value2 + "";
      } 
      if (item.thresholdInputType == "Date"){
        item.value1 = moment(item.value1).format('MM/DD/YYYY')
      } 
      if (item.thresholdInputType == "DateRange"){
        item.value1 = moment(item.value1).format('MM/DD/YYYY')
        item.value2 = moment(item.value2).format('MM/DD/YYYY')
      }  
      if (item.thresholdInputType == "Time"){
        item.value1 = moment(item.value1).format("hh:mm a")
      }   
      if (item.thresholdInputType == "TimeRange"){
        item.value1 = moment(item.value1).format("hh:mm a")
        item.value2 = moment(item.value2).format("hh:mm a")
      }  
    });
    this.service.saveThreshold(selectedList).subscribe((res) => {
      this.loading=false;
			if(res?.success)
      {
        Swal.fire({
          title: 'Success',
          text: 'Recruiters assignment has been saved',
          icon: 'success',
        });
        this.getAll({});
        this.loading = false;
      }
      else
      {
        Swal.fire({
          title: 'error',
          text: res.message,
          icon: 'error',
        });
      }
      this.loading = false;
		});
  }

}

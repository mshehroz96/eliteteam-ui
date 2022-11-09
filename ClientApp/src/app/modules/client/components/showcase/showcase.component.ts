import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonService } from 'src/app/_services/common/common.service';
import { ClientService } from 'src/app/_services/client/client.service';
import { ShowcaseService } from 'src/app/_services';
import { ClientShowCaseFilter } from 'src/app/_models/client/clientshowcasefilter';
import * as moment from 'moment';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
//import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {
  items: any;
  myShowCase: any;
   cols: any;
   exportColumns: any;
   exportData: any[] = [];
  candidates: any[] = [];

  totalRecords: number = 0;
  searchFilter: string = '';
  campaignType: number = 0;
  loading: boolean = false;
  showcaseMessage : string = '';
  constructor(private readonly clientService: ClientService,
    private readonly commonService: CommonService,
    public dialogService: DialogService,public loadingService:LoadingService,
    private showCaseService: ShowcaseService) { }

    ref!: DynamicDialogRef;



  ngOnInit(): void {

    this.getcandidates({});
    this.items = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {
        this.exportExcel();
      }},
      {label: 'Excel', icon: 'pi pi-file-excel', command: () => {
        this.exportExcel();
      }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
        this.exportPdf();
    }},
  ];

  }

  getcandidates(params: ClientShowCaseFilter) {
    this.loading = true;

    params.globalFilter = this.searchFilter;

    this.loadingService.doLoading(
      this.clientService.getClientShowCase(params),this
    ).subscribe((res) => {
      if (res?.success) {
        if(this.candidates.length == 0){
          this.showcaseMessage = 'No Showcase Created!';
        }
        this.candidates = res?.data;
       console.log(this.candidates);
        for (let index = 0; index < this.candidates.length; index++) {
          const element = this.candidates[index];
          if(element.lastModifiedOn != null){
               element.lastActivity =  moment(new Date(element.lastModifiedOn)).fromNow(true);
           }
        }

        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
}

exportExcel() {
  this.exportData = [];
  this.candidates.forEach(element => {
    this.exportData.push( { 'Title' : element.title,
    'Number Of Candidates' : element.numberOfCandidates,
    'Expiry Date' : element.showcaseExpiryDate , 'Last Activity' : element.lastActivity})
  });

//   import('xlsx').then(xlsx => {
//     const worksheet = xlsx.utils.json_to_sheet(this.exportData);
//     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer, "showcase");
// });


}

saveAsExcelFile(buffer: any, fileName: string): void {

  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}



exportPdf() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const head = [['Title', 'No. Of Candidates', 'Expiry Date', 'Last Activity']];

  this.exportData = [];
  this.candidates.forEach(element => {
    this.exportData.push([element.title,element.candidates.length,
      element.showcaseExpiryDate != null ?
      moment(element.showcaseExpiryDate).format("MM/DD/yyyy hh:mm A") : null
      ,element.lastActivity]) ;
  });
    console.log(this.exportData);
    autoTable(doc, {
        head: head,
        body: this.exportData,
        didDrawCell: (data) => { },
    });

  doc.save('showcase.pdf');
 }

 DeleteShowcase(showcaseId:number){

  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to delete this showcase!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
  }).then((result) => {
    if (result.isConfirmed) {
      this.loading = true;
      this.showCaseService.deleteShowCase(showcaseId).subscribe((res) => {
        if(res?.success){
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: "Showcase Deleted",
            text: "Showcase Delete Successfully!",
          });

          this.getcandidates({});
        }
      });
    }
  });
}

}

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RecruiterShowcasefilter } from 'src/app/_models/recutiter/recruiterhowcasefilter';
import { RecruiterService, ShowcaseService } from 'src/app/_services';
import { CommonService } from 'src/app/_services/common/common.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
//import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-recruiter-showcase',
  templateUrl: './recruiter-showcase.component.html',
  styleUrls: ['./recruiter-showcase.component.css']
})
export class RecruiterShowcaseComponent implements OnInit {

  items: any;
  myShowCase: any;
   cols: any;
   exportColumns: any;

  candidates: any[] = [];
  exportData: any []= [];

  totalRecords: number = 0;
  searchFilter: string = '';
  campaignType: number = 0;
  loading: boolean = false;
  showcaseMessage : string = '';
  constructor(private readonly recruiterService: RecruiterService,
    private readonly commonService: CommonService,
    public dialogService: DialogService, private showCaseService: ShowcaseService) { }

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

  getcandidates(params: RecruiterShowcasefilter) {
    this.loading = true;

    params.globalFilter = this.searchFilter;
    this.recruiterService.getRecruiterShowCase(params).subscribe((res) => {
      if (res?.success) {
        this.candidates = res?.data;

        if(this.candidates.length == 0){
          if(this.candidates.length == 0){
            this.showcaseMessage = 'No Showcase Created!';
          }
        }

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

}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  @Input() TableData: any[] = [];
  @Input() TableHeaderData: any[] = [];
  @Input() RouterPrefix: string = '';
  @Input() set PageSize(val: number) {
    this.pageSize = val;
  }

  @Input() enableApproval = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  page: number = 1;
  pageSize: number = 5;
  isDesc: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

}

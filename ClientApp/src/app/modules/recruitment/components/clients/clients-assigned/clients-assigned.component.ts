import { Component, OnInit } from '@angular/core';
import { LIST_TYPES } from 'src/app';
import { clientRMAssignedFilter } from 'src/app/_models/client/clientRMAssignedFilter';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { ClientService } from 'src/app/_services/client/client.service';
import { CommonService } from 'src/app/_services/common/common.service';

@Component({
  selector: 'clients-assigned',
  templateUrl: './clients-assigned.component.html',
  styleUrls: ['./clients-assigned.component.css']
})
export class ClientsAssignedComponent implements OnInit {

  clients: any[] = [];

  totalRecords: number = 0;
  searchFilter: string = '';
  statusLiid: number = 0;
  loading: boolean = false;
  industryid:  number = 0;
  clientIndustries: any[] = [];

  constructor(private clientService: ClientService,
    private readonly commonService: CommonService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getIndustry();
  }


  getIndustry() {
    this.commonService.getListItems(LIST_TYPES.INDUSTRY).subscribe((res: any) => {
      if (res?.success) {
        this.clientIndustries = res?.data;
      }
    });
  }
  getClients(params: clientRMAssignedFilter) {
    this.loading = true;
    params.filter1 = this.industryid;
    params.searchKeyword = this.searchFilter;
    params.globalFilter = this.searchFilter;

    this.clientService.getGetClientsRMAssigned(params).subscribe((res) => {
      if (res?.success) {
        this.clients = res?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
  }

}

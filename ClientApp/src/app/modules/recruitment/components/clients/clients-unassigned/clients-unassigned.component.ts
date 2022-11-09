import { Component, OnInit } from '@angular/core';
import { clientRMUnassignedFilter } from 'src/app/_models/client/clientRMUnassignedFilter';
import { CommonService } from 'src/app/_services/common/common.service';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { ClientService } from 'src/app/_services/client/client.service';
import { LIST_TYPES } from 'src/app';


@Component({
  selector: 'clients-unassigned',
  templateUrl: './clients-unassigned.component.html',
  styleUrls: ['./clients-unassigned.component.css'],
})
export class ClientsUnassignedComponent implements OnInit {
  clients: any[] = [];

  totalRecords: number = 0;
  searchFilter: string = '';
  statusLiid: number = 0;
  loading: boolean = false;
  industry: number = 0;
  clientIndustries: any[] = [];

  constructor(private clientService: ClientService,
    private readonly commonService: CommonService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getIndustry();
  }

  getIndustry() {
    this.commonService.getListItems(LIST_TYPES.INDUSTRY).subscribe((res: any) => {
      if (res?.success) {
        this.clientIndustries = res?.data;
      }
    });
  }

  getClients(params: clientRMUnassignedFilter) {
    this.loading = true;
    params.filter1 = this.industry;
    params.searchKeyword = this.searchFilter;
    params.globalFilter = this.searchFilter;

    this.clientService.getGetClientsRMUnassigned(params).subscribe((res) => {
      if (res?.success) {
        this.clients = res?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
  }
}

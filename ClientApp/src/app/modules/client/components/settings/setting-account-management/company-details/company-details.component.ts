import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { CompanyDetailsRequest } from 'src/app/_models/client/CompanyDetailsRequest';
import { RegisterpageData } from 'src/app/_models/common/common';
import { ClientService } from 'src/app/_services/client/client.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { UserService } from 'src/app/_services/user/user.service';
import { UpdateCompanyDetailsRequest } from 'src/app/_models/client/UpdateCompanyDetailsRequest';
import Swal from 'sweetalert2';
import { FILES_PATHS } from 'src/app';
import { CompanyDetails } from 'src/app/_models/client/CompanyDetails';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';

@Component({
  selector: 'company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  @ViewChild('imgCompanyLogo') imgCompanyLogo!: FileUpload;
  @Input() userType!: number;
  uuid: number = 0;
  clientIndustries: any[] = [];
  companyDetails: CompanyDetails = new CompanyDetails();
  companyDetailsRequest: CompanyDetailsRequest = new CompanyDetailsRequest();
  loading = false;
  error = '';
  data: RegisterpageData = new RegisterpageData();
  strCompanyLogoURL: string = "";
  updateCompanyDetailsRequest: UpdateCompanyDetailsRequest = new UpdateCompanyDetailsRequest(); //TODO:probably not used, remove it
  isLoading_updateCompanyDetails: boolean = false;

  constructor(
    private clientService: ClientService,
    public loadingService:LoadingService,
    private readonly commonService: CommonService,
    private route: ActivatedRoute,
    private userService: UserService) {
  }
  ngOnInit(): void {

    //TODO: check what is this doing here? needed?
    this.userService.getRegisterPageData().subscribe((response) => {
      this.data = response.data;
      this.loading = false;
    },
      error => {
        this.loading = false;
      });

    this.getCompanyDetails();
  }



  uploadCompanyLogo() {
    if (this.imgCompanyLogo._files.length > 0) {
      this.loadingService.doLoading(
      this.commonService.uploadFile(this.imgCompanyLogo._files[0], FILES_PATHS.UPLOAD_COMPANY_LOGO),this)
        .subscribe((res: any) => {
          this.companyDetails.logoFileName = res?.data.uri.split("/").pop();
          this.strCompanyLogoURL = FILES_PATHS.MAP_COMPANY_LOGO(this.companyDetails.logoFileName);
          this.loading = false;
        });
    }
  }

  updateCompanyDetails() {
    this.isLoading_updateCompanyDetails = true;
    this.companyDetails.industry = this.companyDetails.industry.toString(); //TODO:because wrongly defined in DB as string, should be int in DB
    this.companyDetails.noOfEmployees = this.companyDetails.noOfEmployees.toString(); //TODO:because wrongly defined in DB as string, should be int in DB
    this.clientService.updateCompanyDetails(this.companyDetails)
      .subscribe((res: any) => {
        this.isLoading_updateCompanyDetails = false;
        Swal.fire({
          title: 'Company Information Updated',
          text: "Company Information has been updated successfully",
          icon: 'success'
        }).then(() => {
          
        });
      });
  }


  getCompanyDetails() {
    this.clientService.getCompanyDetails(this.companyDetailsRequest).subscribe((res) => {
      if (res?.success) {
        this.companyDetails = res.data;

        this.strCompanyLogoURL = FILES_PATHS.MAP_COMPANY_LOGO(this.companyDetails.logoFileName);
      }
    })
  }

}

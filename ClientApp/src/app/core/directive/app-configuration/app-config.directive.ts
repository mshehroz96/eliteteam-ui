import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppConfigurationService, AuthenticationService } from 'src/app/_services';
@Directive({
  selector: '[appConfig]'
})

export class AppConfigDirective implements OnInit {

  @Input("status") status: string = '';
  @Input("campaignType") campaignType: string = '';
  @Input("template") template: string = '';
  @Input("selector") selector!: string
  @Input("current") current: string = ''

  config: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authenticationService:AuthenticationService,
    private configurationService: AppConfigurationService) {

  }
  ngOnInit(): void {

    this.config = this.configurationService.config.find((x: any) => x.selector == this.selector);

    switch (this.selector) {
      case 'app-applicant-profile':
      case 'app-candidate-profile':
        this.applicantProfileConfig();
        break;
      default:
        break;
    }
  }

  chatMessagesConfig() {

    let userType = this.authenticationService.currentUserValue.userTypeStr;

    if (this.config && userType && this.template) {
      let rule = this.config.rules.find((x: any) => x.userType.includes(userType) && x.parent.includes(this.current));

      if (rule && rule.templates && rule.templates.find((x: any) => x == this.template))
        this.viewContainer.createEmbeddedView(this.templateRef);
      else
        this.viewContainer.clear();
    }
  }

  applicantProfileConfig() {

    if (this.config && this.status && this.template && this.campaignType) {

      let rule = this.config.rules.find((x: any) => x.status.includes(this.status) && x.campaignType.includes(this.campaignType));

      if (rule && rule.templates && rule.templates.find((x: any) => x == this.template))
        this.viewContainer.createEmbeddedView(this.templateRef);
      else
        this.viewContainer.clear();
    }
    else {
      this.viewContainer.clear();
    }
  }
}

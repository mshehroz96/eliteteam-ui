import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { OneWayInterviewQuestion } from 'src/app/_models/one-way-interview/one-way-interview-question';
import { OneWayInterviewTemplate } from 'src/app/_models/one-way-interview/one-way-interview-template';
import { CommonService } from 'src/app/_services/common/common.service';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';
import Swal from 'sweetalert2';
import { TemplateDetailsComponent } from './template-details/template-details.component';

@Component({
  selector: 'app-one-way-interview-templates',
  templateUrl: './one-way-interview-templates.component.html',
  styleUrls: ['./one-way-interview-templates.component.css']
})
export class OneWayInterviewTemplatesComponent implements OnInit {

  _templates: OneWayInterviewTemplate[]=[];
  @Output('templateChanged') templateChanged = new EventEmitter<OneWayInterviewTemplate>();
  @Input() 
  set templates(value: OneWayInterviewTemplate[])
  {
    this._templates = value;
    this.selectDefault();

  };

  get templates()
  {
    return this._templates;
  }
  @Input() defaultTemplateId: number=0;
  @Input() enableQuestionSetting: boolean = false;
  
  questions!:OneWayInterviewQuestion[];
  selectedTemplate:OneWayInterviewTemplate;
  constructor(
    private oneWayInterviewService: OneWayInterviewService,
    private dialogService: DialogService) 
  {
    this.selectedTemplate=new OneWayInterviewTemplate();
  }

  ref!: DynamicDialogRef;
  
  ngOnInit(): void {

  }

  selectDefault(){
    if (this.defaultTemplateId > 0) {
      this.selectedTemplate = this.templates.find(x => x.oneWayInterviewTemplateId == this.defaultTemplateId) ?? new OneWayInterviewTemplate();
      this.getInterviewQuestions(this.defaultTemplateId);
    }
  }
  addTemplate() {
    this.ref = this.dialogService.open(TemplateDetailsComponent, {
      header: 'Add Template',
      data: {
        id: 0,
        action: 'Add'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((template: any) => {
      this.oneWayInterviewService.getInterviewTemplates().subscribe((res) => {
        this.templates = res?.data;
      });
    });
  }
  deleteTemplate()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this template!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {

        this.oneWayInterviewService.deleteInterviewTemplate(this.selectedTemplate.oneWayInterviewTemplateId).subscribe((res)=>
        {
            if(res.success)
            {
              this.templates.splice(this.templates.findIndex(x => x.oneWayInterviewTemplateId == this.selectedTemplate.oneWayInterviewTemplateId),1);
            }
        })
      }
    });
  }
  editTemplate() {
    this.ref = this.dialogService.open(TemplateDetailsComponent, {
      header: 'Edit Template',
      data: {
        id: this.selectedTemplate.oneWayInterviewTemplateId,
        action: 'Edit'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((template: any) => {
      this.oneWayInterviewService.getInterviewTemplates().subscribe((res)=>
      { 
          this.templates=res?.data;
      });
    });

  }
  selectTemplate(template:OneWayInterviewTemplate)
  {
    
    this.selectedTemplate=template;
    this.getInterviewQuestions(this.selectedTemplate.oneWayInterviewTemplateId);
    this.templateChanged.emit(this.selectedTemplate);
  }

  getInterviewQuestions(oneWayInterviewTemplateId:number)
  {
    this.oneWayInterviewService.getInterviewQuestions(oneWayInterviewTemplateId).subscribe((res) => {
      if (res?.success) {
        this.questions = res.data;
      }
    });
  }

}

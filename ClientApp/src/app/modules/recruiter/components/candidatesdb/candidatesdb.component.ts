import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { BehaviorSubject } from 'rxjs';
import { FILES_PATHS } from 'src/app';
import { ComboBox, Filter } from 'src/app/_models/common/common';
import { RecuriterFilter } from 'src/app/_models/recutiter/recutiter-filter';
import { ShowCaseDto } from 'src/app/_models/showcase/showcase';
import { User } from 'src/app/_models/user/user';
import { CommonService } from 'src/app/_services/common/common.service';
import { RecruiterService } from 'src/app/_services/recruiter/recruiter.service';
import { ShowcaseService } from 'src/app/_services/showcase/showcase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidatesdb',
  templateUrl: './candidatesdb.component.html',
  styleUrls: ['./candidatesdb.component.css']
})
export class CandidatesDBComponent implements OnInit {

  loading: boolean = false;

   constructor(
    private commonService: CommonService,
    private recruiterService : RecruiterService,
    private showCaseService : ShowcaseService
   ) { }
   display: boolean = false;
   candidateList:any = [];
   filterList: Array<Filter> = [];
   filters: Array<ComboBox> = [];
   filterField :  any = 0;
   operatorCondition : any = '-- Select --';
   isAutoComplete : boolean = false;
   filterOperators: Array<ComboBox> = [];
   isInputText : boolean = false;
   isInputText1 : boolean = false;
   isMultiSelect : boolean = false;
   isInputDate : boolean = false;
   isDateRange : boolean = false;
   showCase : ShowCaseDto = {
     candidates: [],
     clients: [],
     guid: '',
     isSelectClient: true
   };
   multiSelectedItems: any[] = [];
   allMultiSelectedItems: Array<ComboBox> = [];

   jobTitles: any[] = [];
   companies: Array<ComboBox> = [];
   users: Array<ComboBox> = [];
   candidateStatusListItems: Array<ComboBox> = [];
   primaryLocationListItems: Array<ComboBox> = [];
   jobScheduleListItems: Array<ComboBox> = [];



   addFilters : any[] = [];
   operatorDisplay : any = '-- Select --';
   conditionTarget : any;
   isDisabled : boolean = true;
   inputTextString : any;
   inputTextString1 : any;
   inputDate : any;
   rangeDates : any;
   selectedClients: any;
   allCompanies: any[] = [];
   blocked : boolean = false;
   sotColumn: any = 'Order By LastActivityAt DESC';
  pages: number [] = [];
  first : number = 1;
  rows : number = 10;
  totalRecords: number = 0;
  isDefaultShowCaseDisable: boolean = false;
  recordNotFoundMessage : string = '';
  isOthers: boolean= false;
  emailAddresses : any;

  nodes: any[] = [];
  ngOnInit(): void {
    this.getCandidateData({});
    this.getFilters();
    this.getDropDownItems();
    this.pages.push(1);
    this.pages.push(2);
    this.pages.push(3);
  }

  paginate(event:any) {
    this.first = event.page + 1;
    this.applyFitler();
}

   getCandidateData(params: RecuriterFilter){
    this.blocked = true;
    if(params.sqlCondition == null){
      params.sqlCondition = " 1 = 1";
    }
    params.sqlCondition = params.sqlCondition; //+ ' ' + this.sotColumn;
    params.sortCondition = this.sotColumn;
    params.first= this.first;
    params.rows= this.rows;

    this.recruiterService.getCandidates(params).subscribe((res) => {
      if (res?.success) {
        if(this.candidateList.length ='0'){
          this.recordNotFoundMessage = 'Record Not Found! Try Again.';
        }
        this.candidateList = res?.data;
        this.totalRecords = res?.totalRecords;

        this.blocked = false;
        // this.recruiters[i].strAvatar = FILES_PATHS.MAP_USER_AVATARS(this.recruiters[i].avatarfilename);
        console.log(this.candidateList);
        for (let index = 0; index < this.candidateList.length; index++) {
          const element = this.candidateList[index];
          // this.candidateList[index].strAvatar = FILES_PATHS.MAP_USER_AVATARS(this.candidateList[index].avatarFileName);
          if(element.lastActivityAt != null){
               element.lastActivityAt =  moment(new Date(element.lastActivityAt)).fromNow(true);
           }
        }
      }
    });

  }

  applyFitler(){

    var sqlCondition = '';
    var i = 0;
    this.addFilters.forEach(element => {
      if(i == 0){
        sqlCondition  = sqlCondition +  element.sqlCondition ;
      }
      else{
        sqlCondition = sqlCondition + " AND " + element.sqlCondition;
      }
      i++;
    });


    this.getCandidateData({ sqlCondition : sqlCondition });
  }

  private  getFilters(){
    this.loading = true;
    this.commonService.getFilters().subscribe((res: any) => {
      if (res?.success) {
        this.filterList = res?.data;
        this.loading = false;

        this.filterList.forEach(filter => {
          this.filters.push({ value: filter.id, displayText: filter.filterField })
        });

      }
    });
  }

  private getDropDownItems(){
      this.commonService.getCandidateDropDownItems().subscribe((res: any) => {
        if (res?.success) {
           this.candidateStatusListItems = res?.data.candidateStatusListItems;
           this.primaryLocationListItems = res?.data.primaryLocationListItems;
           this.jobScheduleListItems = res?.data.jobScheduleListItems;
        }
      });
  }

  clearControl(){
    this.allMultiSelectedItems = [];
    this.isAutoComplete = false;
    this.isMultiSelect = false;
    this.isInputText = false;
    this.isInputText1 = false;
    this.isDateRange = false;
    this.isInputDate = false;
  }

  clearFilters(){
    this.addFilters = [];
    this.isDisabled = true;
    this.inputTextString = '';
    this.inputTextString1 = '';
    this.first = 1;
    this.applyFitler();
  }

  getFilterOperator(){
    this.filterOperators = [];
    this.clearControl();

    this.inputTextString = '';
    var filterOption =  this.filterList.filter(x => x.filterField == this.filterField)[0];

      filterOption.filterOptions.forEach(element => {
          this.filterOperators.push({ stringValue : element.operatorDisplay , displayText: element.operatorDisplay});
      });

      if(this.filterField == "Application Status")
      {
        this.candidateStatusListItems.forEach(element => {
          this.allMultiSelectedItems.push({ value : element.value , displayText: element.displayText});
        });
      }
      if(this.filterField == "Work Mode")
      {
        this.primaryLocationListItems.forEach(element => {
          this.allMultiSelectedItems.push({ value : element.value , displayText: element.displayText});
        });
      }
      if(this.filterField == "Work Schedule")
      {
        this.jobScheduleListItems.forEach(element => {
          this.allMultiSelectedItems.push({ value : element.value , displayText: element.displayText});
        });
      }

      if(this.filterField == "Candidate Gender")
      {
        this.allMultiSelectedItems.push({ value : 1 , displayText: "M"});
        this.allMultiSelectedItems.push({ value : 2 , displayText: "F"});
      }

      if(this.filterField == "One-Way Interview")
      {
        this.candidateStatusListItems.forEach(element => {
          if(element.value == 269 || element.value ==270 || element.value == 271)
          {
            this.allMultiSelectedItems.push({ value : element.value , displayText: element.displayText});
          }
        });
      }



  }

  hideAndShowControls(){
    var filterOption =  this.filterList.filter(x => x.filterField == this.filterField)[0];
    this.inputTextString = '';
    this.inputTextString1 = '';
    this.multiSelectedItems= [];
    if((this.operatorDisplay == "Is" || this.operatorDisplay == "Is Not" || this.operatorDisplay == "Was"
    || this.operatorDisplay == "Was Never") && (this.filterField == "Application Status" || this.filterField == "Work Mode"
    || this.filterField == "Work Schedule" || this.filterField == "Candidate Gender"
    || this.filterField == "One-Way Interview")){
      this.isMultiSelect = true;
    }
    else if((this.operatorDisplay == "Is" || this.operatorDisplay == "Is Not"))
    {
      this.isAutoComplete = true;
      this.isInputText = false;
      this.isInputText1 = false;

      this.isMultiSelect = false;
    }
    else if((this.operatorDisplay == "Before" || this.operatorDisplay == "After") && this.filterField == "Last Activity"){
      this.allMultiSelectedItems = [];
      this.isAutoComplete = false;
      this.isInputText = false;
      this.isInputText1 = false;
      this.isDateRange = false;
      this.isInputDate = true;
    }
    else if(this.operatorDisplay == "Between" && this.filterField == "Last Activity"){
      this.allMultiSelectedItems = [];
      this.isAutoComplete = false;
      this.isInputText = false;
      this.isInputText1 = false;
      this.isInputDate = false;
      this.isDateRange = true;
    }
    else if(this.operatorDisplay == "Between"){
      this.allMultiSelectedItems = [];
      this.isAutoComplete = false;
      this.isInputText = true;
      this.isInputText1 = true;
    }
    else if((this.operatorDisplay == "Before" || this.operatorDisplay == "After") && this.filterField != "Last Activity"){
      this.allMultiSelectedItems = [];
      this.isAutoComplete = false;
      this.isInputText = false;
      this.isInputText1 = false;
      this.isInputDate = false;
    }
    else
    {

      this.allMultiSelectedItems = [];
      this.isAutoComplete = false;
      this.isInputText = true;
      this.isInputText1 = false;
      this.isMultiSelect = false;
    }


    filterOption.filterOptions.forEach(element => {
        if(element.operatorDisplay ==  this.operatorDisplay){
          this.conditionTarget = element.conditionTarget;
          return;
        }
    });


  }

  searchFilterForCandidate(event: any) {
    this.commonService.searchFilterForCandidate({ query: event.query , queryFor : this.filterField }).subscribe((res: any) => {
      if (res?.success) {
        this.allMultiSelectedItems = res?.data;
      }
    });

  }

  setJobTitle(obj: any) {

  }

  clearJobTitle(obj:any)
  {
    // this.selectedJobTitle={};
    // this.linkedJobTitles=[];
  }


  searchCompanies(event: any) {
    this.commonService.searchCompanies({ query: event.query }).subscribe((res: any) => {
      if (res?.success) {
        this.allCompanies = res?.data;
      }
    });
  }

  getCompanyAndUsers(){
    this.commonService.getCompanyUsers().subscribe((res: any) => {
      if (res?.success)
      {
        this.nodes = res?.data;
     }
    });
  }

  getCompanyUsers(){

  }



  setCompany(obj: any) {

  }

  operatorSelectChange(){
    this.hideAndShowControls();
  }

  addFilter(){

    var conditionValues = '';
    var conditionValues1 = '';

    console.log(this.rangeDates);

    if(this.isAutoComplete == false){
      conditionValues = this.inputTextString;
    }

    this.multiSelectedItems.forEach(element => {
       if(element.displayText == undefined){
        var data = this.allMultiSelectedItems.find((obj) => {
          return obj.value === element;
        });
        conditionValues = conditionValues +  data?.displayText  + ",";
       }
       else{
         conditionValues = conditionValues +  element.displayText  + ",";
       }
    });

    if(conditionValues != '' && conditionValues.includes(",")){
      conditionValues = conditionValues.slice(0, -1);
    }



    if(this.operatorDisplay == "Between" && this.filterField == "Last Activity")
    {
      conditionValues = moment(this.rangeDates[0]).format('DD/MM/YYYY')  +  " And " + moment(this.rangeDates[1]).format('DD/MM/YYYY');
    }
    else if(this.operatorDisplay == "Between")
    {
      conditionValues = this.inputTextString +  " AND " + this.inputTextString1;
    }
    else if(this.operatorDisplay == "Before" || this.operatorDisplay == "After")
    {
      conditionValues = moment(this.inputDate).format('DD/MM/YYYY');
    }

    var key = this.filterField + " " + this.operatorDisplay + conditionValues;
    var isExist = false;
    //Checking Duplicate Filter
    for (let index = 0; index < this.addFilters.length; index++) {
      if(this.addFilters[index].key == key){
        isExist = true;
      }
    }

    if(isExist == false){
      this.addFilters.push({ key : key,conditionTitle: this.filterField + " " + this.operatorDisplay , conditionValue : conditionValues, sqlCondition : this.creatSqlCondition() });
    }
    if(this.addFilters.length > 0) this.isDisabled = false;
  }

  creatSqlCondition() : any {

    var conditionValues = '' ;
    var conditionValues1 = '' ;
    var sqlCondition = '';
    console.log(this.multiSelectedItems);
    //Multi Selcet Condition Values
    if(this.operatorDisplay == "Is" || this.operatorDisplay == "Is Not"){
      if(this.isMultiSelect)
      {
        // For List Items

        this.multiSelectedItems.forEach(element => {
          //For String In
            if(this.filterField == "Candidate Gender"){
              conditionValues = conditionValues +  (element == 1 ? "'" + 'M' + "'"  : "'" + 'F' +"'" )  + ",";
            }else{
              conditionValues = conditionValues +  element  + ",";
            }

          });
      }
      else{
        this.multiSelectedItems.forEach(element => {
          console.log('Data');
          console.log(element);
          conditionValues = conditionValues +  element.value  + ",";
        });
      }
    }
    else{
      conditionValues = conditionValues +  this.operatorDisplay  + ",";
    }

    if(conditionValues != ''){
      conditionValues = conditionValues.slice(0, -1);
    }

    if(this.isAutoComplete == false && this.isMultiSelect == false){

      conditionValues = this.inputTextString;
      conditionValues1 = this.inputTextString1;
    }
    console.log('Condition Value',conditionValues);
    if(this.operatorDisplay == "Is"){
      sqlCondition = this.conditionTarget + " IN (" + conditionValues + ")"
    }
    else if(this.operatorDisplay == "Is Not"){
        sqlCondition = this.conditionTarget + " NOT IN (" + conditionValues + ")";
    }
    else if(this.operatorDisplay == "Contains"){
      //FOr Candidate
      if(this.filterField == "Candidate Name")
      {
        sqlCondition = this.conditionTarget + " Like " + "'%" + conditionValues + "%'" + " OR " +
        "dbo.Users.LastName" + " Like " + "'%" + conditionValues + "%'";
      }
      else{
        sqlCondition = this.conditionTarget + " Like " + "'%" + conditionValues + "%'";
      }

    }
    else if(this.operatorDisplay == "Not Contains"){
      sqlCondition = this.conditionTarget + " NOT Like " + "'%" + conditionValues + "%'";
    }
    else if(this.operatorDisplay == "Starts With"){
      sqlCondition = this.conditionTarget + " Like " + "'" + conditionValues + "%'" ;
    }
    else if(this.operatorDisplay == "Ends With"){
      sqlCondition = this.conditionTarget + " Like " + "'%"  + conditionValues + "'";
    }
    else if(this.operatorDisplay == "Equal"){
      sqlCondition = this.conditionTarget + " = " + "'" + conditionValues + "'";
    }
    else if(this.operatorDisplay == "Not Equal"){
      sqlCondition = this.conditionTarget + " <> " + "'" + conditionValues + "'";
    }
    else if(this.operatorDisplay == "Less Than"){
      sqlCondition = this.conditionTarget + " < " + "'" + conditionValues + "'";
    }
    else if(this.operatorDisplay == "Greater Than"){
      sqlCondition = this.conditionTarget + " > " + "'" + conditionValues + "'";
    }
    else if(this.operatorDisplay == "Between" && this.filterField == "Last Activity"){
      sqlCondition = this.conditionTarget + " between " + "'" + moment(this.rangeDates[0]).format('DD/MM/YYYY') + "'" + " AND " + "'" + moment(this.rangeDates[1]).format('DD/MM/YYYY') + "'";
    }
    else if(this.operatorDisplay == "Before" && this.filterField == "Last Activity"){
      sqlCondition = this.conditionTarget + " < " + "'" + moment(this.inputDate).format('DD/MM/YYYY') + "'";
    }
    else if(this.operatorDisplay == "After" && this.filterField == "Last Activity"){
      sqlCondition = this.conditionTarget + " > " + "'" + moment(this.inputDate).format('DD/MM/YYYY') + "'";
    }
    else if(this.operatorDisplay == "Between"){
      sqlCondition = this.conditionTarget + " between " + "'" + conditionValues + "'" + " AND " + "'" + conditionValues1 + "'";
    }

    return sqlCondition;


}

  removeFilterItem(key: string){

    for (let index = 0; index <= this.addFilters.length; index++) {
      if(this.addFilters[index].key == key){
        this.addFilters.splice(index,1);
      }
    }

    if(this.addFilters.length == 0) this.isDisabled = true;
  }

  showDialog() {
    this.getCompanyAndUsers();
    var i = 0;
    for (let index = 0; index < this.candidateList.length; index++) {
      if(this.candidateList[index].isSelected){
        i++;
      }
    }

    if(i == 0)
    {
      if(this.showCase.candidates.length ==  0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Plese select candidate!',
          });
          return;

      }
    }

    this.display = true;
    this.isDefaultShowCaseDisable = false;
    this.emailAddresses = '';
    this.showCase.candidates = [];
    this.selectedClients = [];
    this.showCase.clients = [];
    this.showCase.title= '';
    this.showCase.remarks= '';
    this.showCase.isDefaultShowcase = false;
    this.showCase.isAnonymousShowCase = false;

    this.showCase.showcaseExpiryDate = new Date(new Date().setDate(new Date().getDate() + 7));
  }

  hideDialog() {
    this.display = false;
  }

  selectAll() {
    for (var i = 0; i < this.candidateList.length; i++) {
      this.candidateList[i].isSelected = true;
    }
  }

  public findCandidates(candidate: any[]): any[] {
    return candidate.filter(p => p.isSelected == true);
  }

  getSelectedClient() : any{
    var i = 0;
    for (let index = 0; index < this.candidateList.length; index++) {
      const element = this.candidateList[index];

      if (element.isSelected) {
        i ++;
      }
    }

    return i;
  }

  unSelectAll() {
    for (var i = 0; i < this.candidateList.length; i++) {
      this.candidateList[i].isSelected = false;
    }
  }


  private validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private parseFullValue(value: string) {
    const parts = value.split(/<(.*?)>/g);
    const name = parts[0].trim();
    const email = parts[1]?.replace(/<(.*?)>/g, '').trim();

    return { name, email };
  }

  Send(){

    this.showCase.clients = [];
    this.showCase.candidates = [];



    //Push Candidates
    for (let index = 0; index < this.candidateList.length; index++) {
      const element = this.candidateList[index];
      if(element.isSelected)
      {
        this.showCase.candidates.push({candidateUserId: element.candidateUserID });
      }
    }

    //Push Clients
    for (let index = 0; index < this.selectedClients.length; index++) {
        var element= this.selectedClients[index];
        if(element.data != "Others" && element.data != null)
        {

          this.showCase.clients.push({email: element.data , showCaseUUID : '' });
        }
    }




    if(this.emailAddresses != undefined){

      for (let index = 0; index < this.emailAddresses.length; index++) {
        const element = this.emailAddresses[index];
        this.showCase.clients.push({email: element , showCaseUUID : '' });
      }
    }




    if(this.selectedClients.length == 0 && this.showCase.isSelectClient == true){
      Swal.fire({
        icon: 'error',
        title: 'Validation',
        text: 'Plese select clients!',
      });
      return;
    }
    if(this.showCase.isDefaultShowcase == false && this.showCase.title == "" ){
      Swal.fire({
        icon: 'error',
        title: 'Validation',
        text: 'ShowCase title is required!',
      });
      return;
    }


    this.blocked = true;
    this.showCaseService.createShowCase(this.showCase).subscribe((res) => {
      if (res?.success) {
        this.blocked = false;

        if(this.showCase.isAnonymousShowCase == false){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'ShowCase Created Successfully!',
          });
        }else{
          Swal.fire({
            icon: 'success',
            title: 'Showcase created ',
            text: 'Your anonymous showcase has been created successfully. You can share the showcase link:' +  res?.data,
          });
        }

        this.hideDialog();

        for (let index = 0; index < this.candidateList.length; index++) {

          const element = this.candidateList[index];
          element.isSelected = false;

        }

      }
    });
  }

  makeDefault(event:any){
    if(this.showCase.isDefaultShowcase){
      this.showCase.title ='Default Showcase';
      this.isDefaultShowCaseDisable = true;
    }else{
      this.showCase.title ='';
      this.isDefaultShowCaseDisable = false;
    }
  }

  selectClientOnChange(){
    this.showCase.isSelectClient = true;
    this.showCase.isAnonymousShowCase = false;
  }
  selectAnonymousOnChange(){
    this.showCase.isSelectClient = false;
    this.showCase.isAnonymousShowCase = true;
  }

  selectedNode(event:any){
    if(event.node.data == "Others"){
      this.isOthers= true;
    }
  }

  unSelectedNode(event:any){
    if(event.node.data == "Others"){
      this.isOthers= false;
    }
  }

}

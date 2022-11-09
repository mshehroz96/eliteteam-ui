import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExternalShowCaseInputDto } from 'src/app/_models/showcase/showcase';
import { ShowcaseService } from 'src/app/_services/showcase/showcase.service';

@Component({
  selector: 'app-external-showcase',
  templateUrl: './external-showcase.component.html',
  styleUrls: ['./external-showcase.component.css']
})
export class ExternalShowcaseComponent implements OnInit {

  constructor(private route: ActivatedRoute,private showCaseService : ShowcaseService) { }
  showCaseUUID : any;
  showCase: any;
  blocked : boolean = false;
   input: ExternalShowCaseInputDto = new ExternalShowCaseInputDto();
  ngOnInit(): void {
    this.showCaseUUID = this.route.snapshot.params['id'];
    this.getData();
  }

  getData(){
    this.blocked = true;
    this.input.uUID = this.showCaseUUID;
    this.showCaseService.getExternalShowCase(this.input).subscribe((res) => {
      if(res?.success){
        this.showCase = res?.data;
        console.log(this.showCase);
      }

      this.blocked = false;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'src/app/models/setting/paginator';
import { DetailRegistration } from 'src/app/models/cecy/detail-registration';
import { CecyHttpService } from 'src/app/services/cecy/cecy-http.services';
import { MessageService } from '../../../shared/services/message.service';
@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  paginator:Paginator;
  detailRegistrations: DetailRegistration[];
  formDetailRegistration: FormGroup;
  detailRegistration: DetailRegistration;
  detailRegistrationDialog: boolean;
  flagSkeletonListDetailRegistrations: boolean;
  constructor(
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private cecyHttpService: CecyHttpService
  ) {
    this.paginator = { current_page:1, per_page:5};
    this.detailRegistrations = [];
   }

  ngOnInit(): void {
    this.buildFormDetailRegistration();
    this.getDetailRegistrations(this.paginator);
  }

  buildFormDetailRegistration() {
    this.formDetailRegistration = this.formBuilder.group({
        id: [null],
        first_name:[null],
        first_lastname:[null],
        partial_grade1: [null, [Validators.required]],
        partial_grade2: [null, [Validators.required]],
        final_note: [null, [Validators.required]],
        status: [null, [Validators.required]],
    });
  } 
  
    getDetailRegistrations(paginator:Paginator){
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());
      this.flagSkeletonListDetailRegistrations = true;
    this.cecyHttpService.get('detailRegistrations', params).subscribe(
      response => {
        console.log(response['data'])
        this.flagSkeletonListDetailRegistrations = false;
        this.detailRegistrations = response['data'];
        this.paginator = response as Paginator;
      }, error =>{
        this.flagSkeletonListDetailRegistrations = false;
        this.messageService.error(error);
      }
    );
    }

}

import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Paginator } from 'src/app/models/setting/paginator';

import { NgxSpinnerService } from 'ngx-spinner';
import { DetailRegistration } from 'src/app/models/cecy/detail-registration';
import { MessageService } from 'src/app/pages/shared/services/message.service';
import { CecyHttpService } from 'src/app/services/cecy/cecy-http.services';
import { AppHttpService } from 'src/app/services/app/app-http.service'
import { Status } from 'src/app/models/app/status';
@Component({
  selector: 'app-grades-form',
  templateUrl: './grades-form.component.html',
  styleUrls: ['./grades-form.component.css']
})
export class GradesFormComponent implements OnInit {

  @Input() formDetailRegistrationIn: FormGroup;
  @Input() detailRegistrationsIn: DetailRegistration[];
  @Input() paginatorIn: Paginator;

  @Output() displayOut = new EventEmitter<boolean>();
  @Output() detailRegistrationsOut = new EventEmitter<DetailRegistration[]>();
  @Output() paginatorAdd = new EventEmitter<number>();
  @Output() paginatorOut = new EventEmitter<Paginator>();
  

  selectedStatus:Status;
  status:Status[];

  constructor(
    private formBuilder:FormBuilder,
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private cecyHttpService: CecyHttpService,
    private appHttpService: AppHttpService,

  ){ 
    this.getStatus();
  }

  ngOnInit(): void {
    
  }
  get nameStatusField() {
    return this.formDetailRegistrationIn.get('name');
  }

  get finalNoteField() {
    return this.formDetailRegistrationIn.get('final_note');
  }
  get partialGrade2Field() {
    return this.formDetailRegistrationIn.get('partial_grade2');
  }
  get partialGrade1Field() {
    return this.formDetailRegistrationIn.get('partial_grade1');
  }
  
  get idField() {
    return this.formDetailRegistrationIn.get('id');
  }
   // Submit Form

  onSubmit(flag = false) {
    if (this.formDetailRegistrationIn.valid) {
        if (this.idField.value) {
            this.recordGradesDetailRegistration(this.formDetailRegistrationIn.value);
        } else {
            this.storeDetailRegistration(this.formDetailRegistrationIn.value, flag);
        }
    } else {
        this.markAllAsTouchedFormDetailRegistration();
    }
  }
  
// Save in backend
  storeDetailRegistration(detailRegistration: DetailRegistration, flag = false) {
    this.spinnerService.show();
    this.cecyHttpService.store('detailRegistrations', { detailRegistration }).subscribe(response => {
        this.spinnerService.hide();
        this.messageService.success(response);
        this.saveDetailRegistration(response['data']);
        if (flag) {
          this.displayOut.emit(false);
        } 
        this.resetFormDetailRegistration();
        
  
    }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
    });
  }
   // Save in backend
   recordGradesDetailRegistration(detailRegistration: DetailRegistration) {
    this.spinnerService.show();
    this.cecyHttpService.update('detailRegistration/record-grades/' + detailRegistration.id, { detailRegistration })
        .subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveDetailRegistration(response['data']);
            //console.log("eve");
            console.log(this.saveDetailRegistration);
            this.displayOut.emit(false);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
  }
  
  // Save in frontend
    saveDetailRegistration(detailRegistration: DetailRegistration) {
        const index = this.detailRegistrationsIn.findIndex(element => element.id === detailRegistration.id);
        if (index === -1) {
            this.detailRegistrationsIn.push(detailRegistration);
            this.paginatorAdd.emit(1);
        } else {
            this.detailRegistrationsIn[index] = detailRegistration;
        }
        this.detailRegistrationsOut.emit(this.detailRegistrationsIn);
    }

    // Reset Forms
    resetFormDetailRegistration() {
      this.formDetailRegistrationIn.reset();
  }

  // Mark as touched
  markAllAsTouchedFormDetailRegistration() {
      this.formDetailRegistrationIn.markAllAsTouched();
  }

  getStatus() {
    this.appHttpService.get('status').subscribe(response => {
      this.status = response['data'];
    }, error => {
      this.messageService.error(error);
    });
  }



  

  
  
  


}

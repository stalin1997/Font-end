import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'src/app/models/setting/paginator';
import { Attendance } from 'src/app/models/cecy/attendance';
import { CecyHttpService } from 'src/app/services/cecy/cecy-http.services';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

  paginator:Paginator;
  attendances: Attendance[];
  formAttendance: FormGroup;
  attendance: Attendance;
  attendanceDialog: boolean;
  flagSkeletonListAttendances: boolean;
  constructor(
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private cecyHttpService: CecyHttpService
  ) {
    this.paginator = { current_page:1, per_page:5};
    this.attendances = [];
   }

  ngOnInit(): void {
    this.buildFormAttendance();
    this.getAttendances(this.paginator);
  }

  buildFormAttendance() {
    this.formAttendance = this.formBuilder.group({
      assistance: [null]
    });
  } 
  
    getAttendances(paginator:Paginator){
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());
      this.flagSkeletonListAttendances = true;
    this.cecyHttpService.get('attendances', params).subscribe(
      response => {
        console.log(response['data'])
        this.flagSkeletonListAttendances = false;
        this.attendances = response['data'];
        this.paginator = response as Paginator;
      }, error =>{
        this.flagSkeletonListAttendances = false;
        this.messageService.error(error);
      }
    );
    }

}

import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Col } from 'src/app/models/setting/col';
import { Paginator } from 'src/app/models/setting/paginator';
import { Attendance } from 'src/app/models/cecy/attendance';
import { MessageService } from 'src/app/pages/shared/services/message.service';
import { CecyHttpService } from 'src/app/services/cecy/cecy-http.services';
import { File } from 'src/app/models/app/file';

@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.css']
})
export class EvidenceListComponent implements OnInit {

  @Input() flagSkeletonListAttendances: boolean;
  @Input() attendancesIn: Attendance[];
  @Input() attendancesEndIn: Attendance[];
  @Input() paginatorIn: Paginator;
  @Input() formAttendanceIn: FormGroup;
  @Input() displayIn: boolean;
  @Output() attendancesOut = new EventEmitter<Attendance[]>();
  @Output() attendancesEndOut = new EventEmitter<Attendance[]>();
  @Output() formAttendanceOut = new EventEmitter<FormGroup>();

  @Output() displayOut = new EventEmitter<boolean>();
  @Output() paginatorOut = new EventEmitter<Paginator>();
  colsAttendance: Col[];
  selectedAttendances: any[];
  selectedAttendance: Attendance;
  dialogUploadFiles: boolean;
  dialogViewFiles: boolean;
  files: File[];
  paginatorFiles: Paginator;
  currentDate = new Date().toDateString();

  constructor(
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private cecyHttpService: CecyHttpService
  ) { 
    this.resetPaginatorAttendances();
    this.resetPaginator();
    
  }
  resetPaginator() {
    this.paginatorFiles = {current_page: 1, per_page: 10};
}

  ngOnInit(): void {
    this.loadColsAttendance();
  }

  loadColsAttendance() {
    this.colsAttendance = [
      { field: "assistance", header: "Asistencia" },
    ];
  }

  openNewFormAttendance() {
    this.formAttendanceIn.reset();
    this.formAttendanceOut.emit(this.formAttendanceIn);
    this.displayOut.emit(true);
}

openEditFormAttendance(attendance: Attendance) {
    this.formAttendanceIn.patchValue(attendance);
    this.formAttendanceOut.emit(this.formAttendanceIn);
    this.displayOut.emit(true);
}

paginateAttendance(event) {
    this.paginatorIn.current_page = event.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
}

resetPaginatorAttendances() {
    this.paginatorIn = {current_page: 1, per_page: 5};
}


 removeAttendance(attendance: Attendance) {
  this.attendancesIn = this.attendancesIn.filter(element => element !== attendance);
  this.attendancesOut.emit(this.attendancesIn);
} 


searchAttendances(event, search) {
  if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
      const params = search.length > 0 ? new HttpParams().append('search', search) : null;
      this.spinnerService.show();
      this.cecyHttpService.get('attendances', params).subscribe(response => {
          this.attendancesIn = response['data'],
              this.spinnerService.hide();
      }, error => {
          this.spinnerService.hide();
          this.messageService.error(error);
      });
  }
}

removeAttendances(ids) {
  for (const id of ids) {
      this.attendancesIn = this.attendancesIn.filter(element => element.id !== id);
  }
  this.attendancesOut.emit(this.attendancesIn);
}
 //upload files
openUploadFilesAttendance() {
  this.dialogUploadFiles = true;
}
selectAttendance(attendance: Attendance) {
 
  this.selectedAttendance = attendance;
}
openViewFilesAttendance() {
  this.getFiles(this.paginatorFiles);
}


getFiles(paginator: Paginator) {
  
  const params = new HttpParams()
    .append("id", this.selectedAttendance.id.toString())
    .append("page", paginator.current_page.toString())
    .append("per_page", paginator.per_page.toString());
  this.spinnerService.show();
  this.cecyHttpService.getFiles("prerequisite/file", params).subscribe(
    (response) => {
      this.spinnerService.hide();
      this.files = response["data"];
      this.paginatorFiles = response as Paginator;
      this.dialogViewFiles = true;
    },
    (error) => {
      this.spinnerService.hide();
      this.files = [];
      this.dialogViewFiles = true;
      this.messageService.error(error);
    }
  );
}
pageChange(event) {
  this.paginatorIn.current_page = event.page + 1;
  this.paginatorOut.emit(this.paginatorIn);
}

upload(event, id) {
  console.log(event);
  const formData = new FormData();
  for (const file of event) {
    formData.append("files[]", file);
  }
  formData.append("id", id.toString());
  this.spinnerService.show();
  this.cecyHttpService.uploadFiles("prerequisite/file", formData).subscribe(
    (response) => {
      this.spinnerService.hide();
      this.messageService.success(response);
      this.getFiles(this.paginatorFiles);
    },
    (error) => {
      this.spinnerService.hide();
      this.messageService.error(error);
    }
  );
}
searchFiles(search) {
  let params = new HttpParams().append(
    "id",
    this.selectedAttendance.id.toString()
  );
  params = search.length > 0 ? params.append("search", search) : params;
  this.spinnerService.show();
  this.cecyHttpService.get("prerequisite/file", params).subscribe(
    (response) => {
      this.files = response["data"];
      this.spinnerService.hide();
    },
    (error) => {
      this.spinnerService.hide();
      this.messageService.error(error);
    }
  );
}

}

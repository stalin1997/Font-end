import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Col } from 'src/app/models/setting/col';
import { Paginator } from 'src/app/models/setting/paginator';
import { DetailRegistration } from 'src/app/models/cecy/detail-registration';
import { MessageService } from 'src/app/pages/shared/services/message.service';
import { CecyHttpService } from 'src/app/services/cecy/cecy-http.services';
import { File } from 'src/app/models/app/file';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.css']
})
export class GradesListComponent implements OnInit {

  @Input() flagSkeletonListDetailRegistrations: boolean;
  @Input() detailRegistrationsIn: DetailRegistration[];
  @Input() detailRegistrationsEndIn: DetailRegistration[];
  @Input() paginatorIn: Paginator;
  @Input() formDetailRegistrationIn: FormGroup;
  @Input() displayIn: boolean;
  @Output() detailRegistrationsOut = new EventEmitter<DetailRegistration[]>();
  @Output() detailRegistrationsEndOut = new EventEmitter<DetailRegistration[]>();
  @Output() formDetailRegistrationOut = new EventEmitter<FormGroup>();

  @Output() displayOut = new EventEmitter<boolean>();
  @Output() paginatorOut = new EventEmitter<Paginator>();
  colsDetailRegistration: Col[];
  selectedDetailRegistrations: any[];
  selectedDetailRegistration: DetailRegistration;
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
    this.resetPaginatorDetailRegistrations();
    this.resetPaginator();
    
  }
  resetPaginator() {
    this.paginatorFiles = {current_page: 1, per_page: 10};
}

  ngOnInit(): void {
    this.loadColsDetailRegistration();
  }

  loadColsDetailRegistration() {
    this.colsDetailRegistration = [
        {field: 'partial_grade1', header: 'Parcial 1'},
        {field: 'partial_grade2', header: 'Parcial 2'},
        {field: 'final_note', header: 'Nota Final'},
        { field: "status", header: "Estado" },
    ];
  }

  openNewFormDetailRegistration() {
    this.formDetailRegistrationIn.reset();
    this.formDetailRegistrationOut.emit(this.formDetailRegistrationIn);
    this.displayOut.emit(true);
}

openEditFormDetailRegistration(detailRegistration: DetailRegistration) {
    this.formDetailRegistrationIn.patchValue(detailRegistration);
    this.formDetailRegistrationOut.emit(this.formDetailRegistrationIn);
    this.displayOut.emit(true);
}

paginateDetailRegistration(event) {
    this.paginatorIn.current_page = event.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
}

resetPaginatorDetailRegistrations() {
    this.paginatorIn = {current_page: 1, per_page: 5};
}


 removeDetailRegistration(detailRegistration: DetailRegistration) {
  this.detailRegistrationsIn = this.detailRegistrationsIn.filter(element => element !== detailRegistration);
  this.detailRegistrationsOut.emit(this.detailRegistrationsIn);
} 


searchDetailRegistrations(event, search) {
  if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
      const params = search.length > 0 ? new HttpParams().append('search', search) : null;
      this.spinnerService.show();
      this.cecyHttpService.get('detailRegistrations', params).subscribe(response => {
          this.detailRegistrationsIn = response['data'],
              this.spinnerService.hide();
      }, error => {
          this.spinnerService.hide();
          this.messageService.error(error);
      });
  }
}

removeDetailRegistrations(ids) {
  for (const id of ids) {
      this.detailRegistrationsIn = this.detailRegistrationsIn.filter(element => element.id !== id);
  }
  this.detailRegistrationsOut.emit(this.detailRegistrationsIn);
}
 //upload files
openUploadFilesDetailRegistration() {
  this.dialogUploadFiles = true;
}
selectDetailRegistration(detailRegistration: DetailRegistration) {
 
  this.selectedDetailRegistration = detailRegistration;
}
openViewFilesDetailRegistration() {
  this.getFiles(this.paginatorFiles);
}


getFiles(paginator: Paginator) {
  ;
  const params = new HttpParams()
    .append("id", this.selectedDetailRegistration.id.toString())
    .append("page", paginator.current_page.toString())
    .append("per_page", paginator.per_page.toString());
  this.spinnerService.show();
  this.cecyHttpService.getFiles("detailRegistration/file", params).subscribe(
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
  console.log(id);
  const formData = new FormData();
  for (const file of event) {
    formData.append("files[]", file);
  }
  formData.append("id", id.toString());
  this.spinnerService.show();
  this.cecyHttpService.uploadFiles("detailRegistration/file", formData).subscribe(
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
    this.selectedDetailRegistration.id.toString()
  );
  params = search.length > 0 ? params.append("search", search) : params;
  this.spinnerService.show();
  this.cecyHttpService.get("detailRegistration/file", params).subscribe(
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





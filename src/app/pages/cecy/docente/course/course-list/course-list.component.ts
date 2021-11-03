import { HttpParams } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Col } from "src/app/models/setting/col";
import { Paginator } from "src/app/models/setting/paginator";
import { Course } from "src/app/models/cecy/course";
import { MessageService } from "src/app/pages/shared/services/message.service";
import { CecyHttpService } from "src/app/services/cecy/cecy-http.services";


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  @Input() flagCourses: boolean;
  @Input() coursesIn: Course[];
  @Input() coursesEndIn: Course[];
  @Input() paginatorIn: Paginator;
  @Input() formCourseIn: FormGroup;
  @Input() displayIn: boolean;
  @Output() coursesOut = new EventEmitter<Course[]>();
  @Output() coursesEndOut = new EventEmitter<Course[]>();
  @Output() formCourseOut = new EventEmitter<FormGroup>();
  @Output() displayOut = new EventEmitter<boolean>();
  @Output() paginatorOut = new EventEmitter<Paginator>();
  colsCourse: Col[];
  selectedCourses: any[];
  dialogUploadFiles: boolean;
  selectedCourse: Event;
  paginatorFiles: Paginator;
  files: File[];
  dialogViewFiles: boolean;
  currentDate = new Date().toDateString();

  constructor(
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private cecyHttpService: CecyHttpService
  ) { 
    this.resetPaginatorCourses();
    this.resetPaginator();
  }
  resetPaginator() {
    this.paginatorFiles = { current_page: 1, per_page: 5 };
  }

  ngOnInit(): void {
    this.loadColsCourse();
  }
  loadColsCourse() {
    this.colsCourse = [
      { field: "name", header: "Nombre" },
    ];
  }

  openNewFormCourse() {
    this.formCourseIn.reset();
    this.formCourseOut.emit(this.formCourseIn);
    this.displayOut.emit(true);
  }

  openEditFormCourse(course: Course) {
    this.formCourseIn.patchValue(course);
    this.formCourseOut.emit(this.formCourseIn);
    this.displayOut.emit(true);
  }

  paginateCourse(course) {
    this.paginatorIn.current_page = course.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
  }

  resetPaginatorCourses() {
    this.paginatorIn = { current_page: 1, per_page: 5 };
  }

  removeCourse(course: Course) {
    this.coursesIn = this.coursesIn.filter((element) => element !== course);
    this.coursesOut.emit(this.coursesIn);
  }

  searchCourses(course, search) {
    if (course.type === "click" || course.keyCode === 1 || search.length === 0) {
      const params =
        search.length > 0 ? new HttpParams().append("search", search) : null;
      this.spinnerService.show();
      this.cecyHttpService.get("courses", params).subscribe(
        (response) => {
          (this.coursesIn = response["data"]), this.spinnerService.hide();
        },
        (error) => {
          this.spinnerService.hide();
          this.messageService.error(error);
        }
      );
    }
  }

  removeEvents(ids) {
    for (const id of ids) {
      this.coursesIn = this.coursesIn.filter((element) => element.id !== id);
    }
    this.coursesOut.emit(this.coursesIn);
  }
}

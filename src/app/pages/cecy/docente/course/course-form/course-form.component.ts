import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Paginator } from "src/app/models/setting/paginator";
import { Course as CourseModel } from "src/app/models/cecy/course";
import { MessageService } from "src/app/pages/shared/services/message.service";
import { CecyHttpService } from "src/app/services/cecy/cecy-http.services";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @Input() formCourseIn: FormGroup;
  @Input() coursesIn: CourseModel[];
  @Input() paginatorIn: Paginator;
  @Output() displayOut = new EventEmitter<boolean>();
  @Output() coursesOut = new EventEmitter<CourseModel[]>();
  @Output() paginatorAdd = new EventEmitter<number>();
  @Output() paginatorOut = new EventEmitter<Paginator>();
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private cecyHttpService: CecyHttpService
  ) {}

  ngOnInit(): void {}
  get nameField() {
    return this.formCourseIn.get("name");
  }
  

  // Submit Form
  /* onSubmit(course: Course, flag = false) {
    course.preventDefault();
    if (this.formCourseIn.valid) {
      if (this.idField.value) {
        this.updateEvent(this.formCourseIn.value);
      } else {
        this.storeEvent(this.formCourseIn.value, flag);
        this.formCourseIn.reset();
      }
    } else {
      this.formCourseIn.markAllAsTouched();
    }
  }
  paginateEvent(event) {
    this.paginatorOut.emit(this.paginatorIn);
  } */

 /*  storeEvent(event: EventModel, flag = false) {
    debugger;
    this.spinnerService.show();
    this.uicHttpService.store("events", { event }).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.messageService.success(response);
        this.saveEvent(response["data"]);
        this.paginatorOut.emit(this.paginatorIn);
        if (flag) {
          this.formEventIn.reset();
        } else {
          this.displayOut.emit(false);
        }
      },
      (error) => {
        this.spinnerService.hide();
        this.messageService.error(error);
      }
    );
  } */

  /* // Save in frontend
  saveEvent(event: EventModel) {
    const index = this.eventsIn.findIndex((element) => element.id === event.id);
    if (index === -1) {
      this.eventsIn.push(event);
    } else {
      this.eventsIn[index] = event;
    }
    this.eventsOut.emit(this.eventsIn);
  }

  // Save in backend
  updateEvent(event: EventModel) {
    this.spinnerService.show();
    this.uicHttpService.update("events/" + event.id, { event }).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.messageService.success(response);
        this.saveEvent(response["data"]);
        this.displayOut.emit(false);
      },
      (error) => {
        this.spinnerService.hide();
        this.messageService.error(error);
      }
    );
  }
 */

}

import { Component, OnInit } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Paginator } from "src/app/models/setting/paginator";
import { Course} from "src/app/models/cecy/course";
import { CecyHttpService } from "src/app/services/cecy/cecy-http.services";
import { MessageService } from "../../../shared/services/message.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  paginator: Paginator;
  courses: Course[];
  formCourse: FormGroup;
  course: Course;
  courseDialog: boolean;
  flagSkeletonListCourses: boolean;

  constructor(
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private cecyHttpService: CecyHttpService
  ) { 
    this.paginator = { current_page: 1, per_page: 5 };
    this.courses = [];
  }

  ngOnInit(): void {
    this.buildFormCourse();
    this.getCourses(this.paginator);
  }

  buildFormCourse() {
    this.formCourse = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      
    });
  }

  getCourses(paginator: Paginator) {
    const params = new HttpParams()
      .append("page", paginator.current_page.toString())
      .append("per_page", paginator.per_page.toString());
    this.flagSkeletonListCourses = true;
    this.cecyHttpService.get("courses", params).subscribe(
      (response) => {
        console.log(response["data"])
        this.flagSkeletonListCourses = false;
        this.courses = response["data"];
        this.paginator = response as Paginator;
      },
      (error) => {
        this.flagSkeletonListCourses = false;
        this.messageService.error(error);
      }
    );
  }
}

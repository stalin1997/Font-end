import { Catalogue } from "../app/catalogue";
import { Status } from "../app/status";
import { Autorithy } from "./autorithy";
import { Course } from "./course";
import { Instructor } from "./instructor";

export interface DetailPlanification {
    id?:number;
    date_start?:string;
    date_end?:string;
    summary?:string;
    planned_end_date:string;
    course_id?:Course;
    instructor_id?:Instructor;

    authority_rector?:Autorithy;
    authority_participants_firm?:Autorithy;
    authority_instructor_firm?:Autorithy;
    location_certificate?:string;
    code_certificate?:string;
    status_certificate_id?:Catalogue;
    state_id?:Status;
    capacity?:number;
    site_dictate?:Catalogue;
    observation?:string;
    conference?:Catalogue;
    parallel?:Catalogue;
    needs?:string[];
    need_date?:string;
}

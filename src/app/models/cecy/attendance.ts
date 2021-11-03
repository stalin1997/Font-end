import { DetailRegistration } from "./detail-registration";

export interface Attendance {

id?:number;
detail_registration_id?:DetailRegistration;
date?:Date;
day_hours?:String;
assistance?:Boolean;
observations?:string[];
}
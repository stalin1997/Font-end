import { Catalogue } from "../app/catalogue";

export interface AdditionalInformation {
    id? : number;
    company_name?:string;
    company_activity?:string;
    company_address?:string;
    company_phone?:string;
    company_sponsor?:boolean;
    name_contact?:string;
    know_course?:string[];
    course_follow?:string[];
    works?:boolean;
    level_instruction:Catalogue;


}

import { Catalogue } from "../app/catalogue";
import { DetailPlanification } from "./detail-planification";

export interface Registration {
    id?:number;
    date_registration?:Date;
    status_id?:Catalogue;
    type_id?:Catalogue;
    number?:string;
    planification_id?:DetailPlanification;
    

}

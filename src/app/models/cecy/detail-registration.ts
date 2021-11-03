
import { Catalogue } from "../app/catalogue";
import { AdditionalInformation } from "./additional-information";
import { DetailPlanification } from "./detail-planification";
import { Registration } from "./registration";

export interface DetailRegistration {
    id? : number;
    registration_id?:Registration;
    additional_information_id?:AdditionalInformation;
    detail_planification_id? : DetailPlanification;
    status_id? : Catalogue;
    partial_grade1?: number;
    partial_grade2?: number;
    final_note? : number;
    code_certificate?: string;
    status_certificate_id?: Catalogue;
    certificate_withdrawn?: string;
    location_certificate?: string;
    observation? : string[];

}

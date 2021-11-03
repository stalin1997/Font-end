import { Career } from "../app/career";
import { Catalogue } from "../app/catalogue";
import { Classroom } from "../app/classroom";
import { Institution } from "../app/institution";
import { User } from "../auth/user";

export interface Course {
    id?:number;
    code?:string;
    name?:string;
    hours_duration?:number;
    free?:boolean;
    cost?:number;
    summary?:string;
    modality_id?:Catalogue;
    observation?:string;
    objective?:string;
    needs?:string[]
    Target_group?:string[];
    facilities?:string[];
    theoretical_phase?:string[];
    practical_phase?:string[];
    main_topics?:string[];
    secundary_topics:string[];
    cross_cutting_topics:string[];
    bibliography?:string[];
    teaching_strategies?:string[];
    participant_type_id?:Catalogue;
    area_id?:Catalogue;
    level_id?:Catalogue;
    required_installing_sources?:string;
    practice_hours?:number;
    theory_hours?:number;
    canton_dictate_id?:Catalogue;
    capacitation_type_id?:Catalogue;
    course_type_id?:Catalogue;

    entity_certification_type_id?:Catalogue;
    practice_required_resources?:string;
    aimtheory_required_resources?:string;
    learning_teaching_strategy?:string;
    person_proposal_id?:User;
    proposed_date?:Date;
    approval_date?:Date;
    local_proposal?:string;
    project?:string;
    capacity?:number;
    classroom_id?:Classroom;

    specialty_id?:Catalogue;
    academic_period_id?:Catalogue;
    institution_id?:Institution;
    place?:string;
    career_id?:Career;
    setec_name?:string;
    abbreviation?:string;
    certified_type_id?:Catalogue;
    bibliographys?:string[];

    status?:number;

}

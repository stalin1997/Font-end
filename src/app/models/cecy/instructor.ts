import {User} from '../auth/user';
import {Catalogue} from '../app/catalogue';

export interface Instructor {
    id? : number;
    user_id?:User;
    responsable_id? : User;
    type_instructor_id? : Catalogue; 
}

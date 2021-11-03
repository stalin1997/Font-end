import { Catalogue } from "../app/catalogue";
import { User } from "../auth/user";

export interface Autorithy {
    id?:number;
    user_id?:User;
    position_id?:Catalogue;
    status_id?:Catalogue;
    functions?:string[];
    start_date?:Date;
    end_date?:Date;
    
}

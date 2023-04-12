import { User } from "./user";


export class Complaint{
    id:number;
    subject:string;
    detail:string;
    user:User;
    resolved:boolean;
    last_update:Date;
}
import { Complaint } from "./complaint";
import { User } from "./user";


export class ComplaintUpdate{
    id:number;
    complaint:Complaint;
    user:User;
    isWorkingOn:boolean;
    isResolved:boolean;
    statusRemark:string;
    last_update:Date;
}
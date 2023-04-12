import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user:User=new User();
message:any;
  constructor(private service:UserService,public router:Router) { }
  
    ngOnInit(): void {
   
    }
    
    addUser() {
      let response=this.service.addUser(this.user)
      response.subscribe((data:any)=>this.user=data);
      

      if(this.user.name!=null){
        this.message="Registered Successfully!!";
      }
    }
  
  }

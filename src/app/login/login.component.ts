import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  user:User;
  response:string = "";

  userid:number = Number(sessionStorage.getItem("userid"));
  
  constructor(private builder: FormBuilder, private router:Router,private service:UserService) { }

  ngOnInit(): void {
    if(this.userid != null && this.userid > 0){
      this.router.navigate(['home']);
    }
    this.loginForm = this.builder.group({
      usertype: ['', Validators.required],
      username: ['', Validators.required],
      password: ['',[Validators.required]]
    });
    this.loginForm.controls['usertype'].setValue("CUSTOMER");
  }
  get form() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    
    if (this.loginForm.invalid)
      return;
    else {
     this.service.loginUser(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value, 
      this.loginForm.controls['usertype'].value).subscribe({
        next: (u:any)=> {
        this.user = u;
        if(this.user !== undefined && this.user.id > 0){
          this.response = "Successfully Logged In..!";
          sessionStorage.setItem("userid",this.user.id.toString());
          sessionStorage.setItem("username",this.user.name);
          sessionStorage.setItem("usertype",this.user.usertype.toString());
          setTimeout(()=>{ 
            this.router.navigate(['home']) 
            window.location.reload()
          }, 1000);
          
        }
      }, 
      error:(err:any)=>{
        this.response = "Login Error : Invalid Username, Password or Usertype.." ;
      }});
    }
  }

} {

}

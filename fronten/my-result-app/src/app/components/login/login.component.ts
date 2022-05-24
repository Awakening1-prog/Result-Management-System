import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials={
    email:'',
    password:''
  }
  constructor(private userService: UsersService,
    private router:Router ) { }

  ngOnInit(): void {
  }
  onSubmit()
  {
    if(this.credentials.email!="" && this.credentials.password!="")
    {
      console.log(this.credentials.email);
      this.userService.doLogin(this.credentials).subscribe(
        response=>{
          console.log("response" , response);  
          this.router.navigate(['/result']);
      },
      error=>
      {
        alert("Invalid user");
        console.log(error);
      }
      )
    }
  }
}

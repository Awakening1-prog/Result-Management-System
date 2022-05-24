import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  user:any;
  currentUser:any;

  constructor(private userservice: UsersService,
    private route : ActivatedRoute,
    private router: Router) { 
   
  }

  ngOnInit(): void {
    this.retrieveallUserData()
  }
  retrieveallUserData() {
    this.userservice.getAll()
      .subscribe(
        data => {
          this.user = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  getUser(rollno:any)
  {
    this.userservice.get(rollno)
    .subscribe(
      data=>
      {
        this.currentUser=data;
        console.log("in delete",data,rollno);
      },
    error =>
    {

      console.log(error);
    }
    );

  }

  deleteUser(rollno:any) {
    this.userservice.delete(rollno)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/result']);
        },
        error => {
          console.log("In error",error);
        });
        this.router.navigate(['/result']);
  }
  logout()
  {
    localStorage.removeItem("Token");
    this.router.navigate(['/']);
    return true;
  }


}

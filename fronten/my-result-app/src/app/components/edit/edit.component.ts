import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {ActivatedRoute, Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';
@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  currentUser :any;
  message='';
  constructor(private userservice : UsersService
    ,private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getuser(this.route.snapshot.paramMap.get('rollno'));
  }
  getuser(rollno:any)
  {
    this.userservice.get(rollno)
    .subscribe(
      data => {
        this.currentUser = data;
        // console.log("in edit",data);

      },
      error=>
      {
       console.log(error);
      }
      );
      
  }
  updateUser() {
    const data = {
      rollno: this.currentUser.rollno,
      name: this.currentUser.name,
      dob:this.currentUser.dob,
      score:this.currentUser.score
      
    };
    this.userservice.update(this.currentUser.rollno, data)
      .subscribe(
        response => {
          console.log(response);
          console.log("new",data);
          this.message = 'The user was updated successfully!';
          this.router.navigate(['/result']);
        },
        error => {
          console.log(error);
        });
  }

}

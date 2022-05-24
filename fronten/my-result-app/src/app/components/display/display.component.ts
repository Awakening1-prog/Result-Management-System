import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  currentUser:any;
  flag=true;
  constructor(
    private userservice : UsersService
    ,private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getuser(this.route.snapshot.paramMap.get('rollno'));
  }
  getuser(rollno:any)
  {
    
      this.userservice.get(rollno)
      .subscribe(
        data => {
          this.currentUser = data;
          if(data==null)
          {
            // alert("User Not Found")
            this.flag=false;
            console.log("user not found")
          }
          else
          {
          // console.log("in display",data);
          this.flag=true;
          }

        },
        error=>
        {
        console.log("In line 39 user not find")
        
        }
        );
      
  }

}

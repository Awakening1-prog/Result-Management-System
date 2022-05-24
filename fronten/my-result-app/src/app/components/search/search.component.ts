import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  currentUser:any;
  constructor(
    private userservice : UsersService
    ,private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
  
  }
  getuser(rollno:any)
  {
    this.userservice.get(rollno)
    .subscribe(
      data => {
        this.currentUser = data;
        // console.log("in search",data,rollno);
        this.router.navigate([`/output/${rollno}`]);

      },
      error=>
      {
       console.log(error);
      }
      );
      
  }

}

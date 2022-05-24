import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  user={
    rollno:'',
    name:'',
    dob:'',
    score:'',
  }

  constructor(private usersevice : UsersService,
    private route : ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveUser()
  {
    const data=
    {
      rollno:this.user.rollno,
      name:this.user.name,
      dob:this.user.dob,
      score:this.user.score

    };
    this.usersevice.create(data)
    .subscribe(
      response=>{
        console.log(response);
        this.router.navigate(['/result']);
      },
      error=>
      {
        console.log(error);
      });
  }

}

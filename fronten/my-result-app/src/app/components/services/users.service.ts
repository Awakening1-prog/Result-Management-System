import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { templateJitUrl } from '@angular/compiler';


const baseUrl = 'http://localhost:9090/api/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
    private router: Router) { }

  setLocalStorage(request : any) {
    return (
      request.hasOwnProperty('token') &&
      localStorage.setItem('Token', request.token)
    );
  }

  getAll()
  {
    const token = localStorage.getItem('Token');
    return this.http.get(baseUrl , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      catchError((err) => {
        return new Observable((res) => {
          const reqData = {
            message: err.statusText,
            status: err.status,
          };
          res.next(reqData);
        });
      })
    );
  }

  get(rollno:any)
  {
    return this.http.get(`${baseUrl}/${rollno}`);
  }
  create(data:any){
    return this.http.post(baseUrl,data);
  }
  update(rollno:any, data:any) {
    return this.http.put(`${baseUrl}/${rollno}`, data);
  }

  delete(rollno:any) {
    return this.http.delete(`${baseUrl}/${rollno}`);
  }
  findByRollno(rollno:any) {
    return this.http.get(`${baseUrl}?rollno=${rollno}`);
  }

  doLogin(data:any)
  {
    return this.http.post(baseUrl + '/register', data).pipe(
      tap((res) => {
        console.log("In line 69",res,data)
        this.setLocalStorage(res);
        this.router.navigate(['/result']);
      }),
      catchError((err) => {
        const { error } = err;

        return new Observable((res) => {
          let reqData = {};

          if (err.status === 401) {
            reqData = {
              message: error.message,
              status: error.status,
              token: error.token,
            };
          } else {
            reqData = {
              message: err.statusText,
              status: err.status,
              token: '',
            };
          }
          res.next(reqData);
        });
      })
    );
  }
  isLoggedIn()
  {
    let token =localStorage.getItem("Token");
    if(token===undefined || token==='' || token ===null)
    {
      return false;
    }
    else{
      return true;
    }
  }
  getToken()
  {
    return localStorage.getItem("token");
    
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user:any= { };
  private userUpdated = new Subject<{ token: String, userName: String, _id: String, auth: boolean }>();
  constructor(private http: HttpClient) { }

  getRightUser():Observable<any>{
    const token = localStorage.getItem('user');
    return this.http.get<any>('http://localhost:3000/tokenn/' + token)
   }

  getuser() {
    const token = localStorage.getItem('user');
    if (token) {
      this.http.get<any>('http://localhost:3000/tokenn/' + token).subscribe(info => {
        if (info) {
          this.user = { token: token, userName: info.userName, _id: info._id, auth: true };
          this.userUpdated.next({ ...this.user });

        }else{
          this.user= { token: null, userName: null, _id: null, auth: false };
          this.userUpdated.next({ ...this.user });
    
        }
      });
    }else{
      this.user= { token: null, userName: null, _id: null, auth: false };
      this.userUpdated.next({ ...this.user });


    }
  }

  logout(){
    localStorage.removeItem('user')
    this.user = { token: null, userName: null, _id: null, auth: false };
    this.userUpdated.next({ ...this.user });
  }

  logincheck(userAndPass: { username: String, password: String }) {
    let re = this.http.post<any>('http://localhost:3000/login', userAndPass)
    re.subscribe(info => {
      if (info) {
        localStorage.setItem('user', info)
        this.getuser();
      } else {
        return info;
      }

    })
  }
  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }


}


// this.posts.push(post);
// this.postsUpdated.next([...this.posts]);
// this.router.navigate(["/"]);
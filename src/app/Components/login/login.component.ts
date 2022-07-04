import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user :any={token: null, userName: null, _id: null, auth: false}
  private userSub: Subscription = new Subscription;

  constructor(private UserService :UserService) { }

  ngOnInit(): void {
    this.userSub = this.UserService.getUserUpdateListener()
      .subscribe((user: any) => {
        this.user=user;
      });

  }

  onLogout(){
    this.UserService.logout()
  }
  onSubmit(data: NgForm) {
    if (data.valid)
this.UserService.logincheck(data.value)

}

}

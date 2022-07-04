import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from "../../service/user.service";
import { PostService } from "../../service/post.service";
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit,OnDestroy {
  rightUser$!: Observable<any>;

  user :any={}
  private userSub: Subscription = new Subscription;

  constructor(private UserService:UserService,private PostService:PostService,private router:Router) {  }

  ngOnInit(): void {
    // this.UserService.getuser();
    // this.userSub = this.UserService.getUserUpdateListener()
    // .subscribe((user: any) => {
    //   this.user=user;
    //   if(!this.user){
    //    this.router.navigate(["/"]);
    //   }
    // });
    this.rightUser$=this.UserService.getRightUser();
    this.rightUser$.subscribe(user =>{
      if(!user.auth)
    this.router.navigate(["/"]);

    })

  }
  ngOnDestroy(){
   // this.userSub.unsubscribe();

  }

  onSubmit(data :NgForm){
    let newpost={...data.value,user:localStorage.getItem('user')}
    this.PostService.addPost(newpost)
  }

}

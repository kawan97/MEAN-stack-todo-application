import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from "../../service/user.service";
import { PostService } from "../../service/post.service";
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user: any = {};
  rightUser$!: Observable<any>;
id:String='';
  post: any;
  private userSub: Subscription = new Subscription;

  constructor(
    private http: HttpClient,
    private UserService: UserService,
    private PostService: PostService,
    private router: Router,
    private activeRote: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRote.params.subscribe((params: Params) => {
      this.http.get<any>('http://localhost:3000/post/update/' + params.id).subscribe(post => {
        if (post) {
          this.id=params.id;
        //   this.UserService.getuser();
        //  this.post=post;
        //   this.userSub = this.UserService.getUserUpdateListener()
        //     .subscribe((user: any) => {
        //       console.log('hi from ')

        //       this.user = user;
        //       if (user.token && post._id === user._id) {
        //         this.post = post;
        //       } else {

        //         this.router.navigate(["/"]);

        //       }
        //     });
        this.rightUser$=this.UserService.getRightUser();
        this.rightUser$.subscribe(user =>{
          if(!(user.auth && post.user._id=== user._id)){
            this.router.navigate(["/"]);

          }else{
            this.post=post;
          }
    
        })


        } else {
          this.router.navigate(["/"]);

        }
      })

    });


  }

  onSubmit(data: NgForm) {
   let updated = { ...data.value,id:this.id }
    this.PostService.updatePost(updated);
  }

}

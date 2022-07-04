import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PostService } from "../../service/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
 // posts: any[] = [];
  allPosts$!: Observable<any>;

 // private postsSub: Subscription = new Subscription;

  constructor(public postservice : PostService) { }

  ngOnInit(): void {
    // this.postservice.getposts();
    // this.postsSub = this.postservice.getPostUpdateListener()
    //   .subscribe((posts: any) => {
    //     this.posts = posts;
    //   });

    this.allPosts$=this.postservice.getAllPost()
   // this.postservice.getAllPost().subscribe(post => console.log(post))
  //  console.log(this.allPosts$)
  }
  ngOnDestroy() {
  //this.postsSub.unsubscribe();
  }

}

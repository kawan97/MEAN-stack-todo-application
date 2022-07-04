import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from "../../service/post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit,OnDestroy {
  posts: any[] = [];
  private postsSub: Subscription = new Subscription;

  constructor(public postservice : PostService) { }

  ngOnInit(): void {
    this.postservice.getposts();
    this.postsSub = this.postservice.getPostUpdateListener()
      .subscribe((posts: any) => {
        this.posts = posts;
      });
  }
  ngOnDestroy() {
  this.postsSub.unsubscribe();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: any;
  private postsUpdated = new Subject<any>();  
  
  constructor(private http: HttpClient,private router:Router) { }

  getposts() {
    this.http.get('http://localhost:3000/post').subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getnext(){
    this.postsUpdated.next([...this.posts]);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getAllPost():Observable<any>{
   return this.http.get('http://localhost:3000/post')
  }

  addPost(data:{title:String,info:String,user:String}){
    this.http.post('http://localhost:3000/post/create',data).subscribe(addnewpost => {
      console.log(addnewpost)
       this.posts.push(addnewpost);
       this.postsUpdated.next([...this.posts]);
       this.router.navigate(["/"]);
    });


  }

  updatePost(data:{title:String,info:String,id:String}){
    this.http.put('http://localhost:3000/post/update/'+data.id,data).subscribe(updatedpost => {
      console.log(updatedpost)
       this.posts.push(updatedpost);
       this.postsUpdated.next([...this.posts]);
       this.router.navigate(["/"]);
    });


  }

}


// this.posts.push(post);
// this.postsUpdated.next([...this.posts]);
// this.router.navigate(["/"]);

// setTimeout(() =>{ 
//   this.posts.push({title:'new title ',user:{userName:'bikas'}});
//   this.postsUpdated.next([...this.posts]);
//  }, 5000);
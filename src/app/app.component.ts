import { Component ,OnInit} from '@angular/core';
import { PostService } from "./service/post.service";
import { UserService } from "./service/user.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mean';

  constructor(public postservice : PostService,private UserService:UserService) { }

  ngOnInit(): void {
    console.log('hi from app component')
    this.postservice.getposts();
    this.UserService.getuser();
  }

  

}

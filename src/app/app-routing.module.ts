import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PostsComponent} from './Components/posts/posts.component';
import { CreateComponent } from './Components/create/create.component';
import { EditComponent } from "./Components/edit/edit.component";
import { F404Component } from "./Components/f404/f404.component";
import { HomeComponent } from "./Components/home/home.component";
import { LoginComponent } from "./Components/login/login.component";
import { SingupComponent } from "./Components/singup/singup.component";
const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent },
  { path: '**', component: F404Component },


];

// const routes: Routes = [
//   { path: 'first-component', component: FirstComponent },
//   { path: 'second-component', component: SecondComponent },
//   { path: '',   redirectTo: '/first-component', pathMatch: 'full' }, // redirect to `first-component`
//   { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

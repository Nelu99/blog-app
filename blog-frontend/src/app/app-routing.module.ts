import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostComponent } from './Components/blog-post/blog-post.component';
import { PostListComponent } from './Components/posts_list/PostListComponent';
import { RegisterComponent } from './Components/register/register.component'
import { UserListComponent } from './Components/user-list/user-list.component';
import { WriteFormComponent } from './Components/write-form/write-form.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'explore', component: PostListComponent },
  { path: 'explore/:interest', component: PostListComponent },
  { path: 'post/:id', component: BlogPostComponent },
  { path: 'post', component: WriteFormComponent },
  { path: 'users', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

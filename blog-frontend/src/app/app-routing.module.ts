import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostComponent } from './Components/blog-post/blog-post.component';
import { PostListComponent } from './Components/posts_list/PostListComponent';
import { RegisterComponent } from './Components/register/register.component'

const routes: Routes = [
  { path: '', component: BlogPostComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'explore', component: PostListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

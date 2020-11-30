import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostComponent } from './Components/blog-post/blog-post.component';
import { RegisterComponent } from './Components/register/register.component'

const routes: Routes = [
  { path: '', component: BlogPostComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

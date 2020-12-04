import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './Components/top-navbar/top-navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BlogPostComponent } from './Components/blog-post/blog-post.component';
import { InterestsWidgetComponent } from './Components/interests-widget/interests-widget.component';
import { SideWidgetComponent } from './Components/side-widget/side-widget.component';
import { RegisterComponent } from './Components/register/register.component';
import { PostListModule } from './Components/posts_list/PostListModule';

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    FooterComponent,
    BlogPostComponent,
    InterestsWidgetComponent,
    SideWidgetComponent,
    RegisterComponent
  ],
  imports: [
    PostListModule,
    BrowserModule,
    AppRoutingModule,
  ],
  exports:[PostListModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

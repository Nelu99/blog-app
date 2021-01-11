import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './Components/top-navbar/top-navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BlogPostComponent } from './Components/blog-post/blog-post.component';
import { InterestsWidgetComponent } from './Components/interests-widget/interests-widget.component';
import { RegisterComponent } from './Components/register/register.component';
import { PostListModule } from './Components/posts_list/PostListModule';
import { PostService } from './Components/services/PostService';
import { HttpClientModule } from '@angular/common/http';
import { PostResource } from './Components/services/PostResource';
import { WriteFormComponent } from './Components/write-form/write-form.component';
import { CommonModule } from '@angular/common';
import { SideWidgetModule } from './Components/side-widget/side-widget.component.module';
import { CookieService } from 'ngx-cookie-service';
import { UserListComponent } from './Components/user-list/user-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    FooterComponent,
    BlogPostComponent,
    InterestsWidgetComponent,
    RegisterComponent,
    WriteFormComponent,
    UserListComponent
  ],
  imports: [
    SideWidgetModule,
    CommonModule,
    SocialLoginModule,
    PostListModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  exports: [PostListModule],
  providers: [
    CookieService,
    PostService,
    PostResource,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '27590364696-4l1l86vtgllornfl3dceglk8etl56bl0.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('204352844723154')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

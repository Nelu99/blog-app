import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { ApiConfig } from '../services/ApiConfig';
import { UserItemC } from '../user/UserItemC';

@Component({
  selector: 'app-side-widget',
  templateUrl: './side-widget.component.html',
  styleUrls: ['./side-widget.component.css']
})
export class SideWidgetComponent implements OnInit {

  URL = ApiConfig.url;

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router, private authService: SocialAuthService) { }

  ngOnInit(): void {
  }

  public getUser() {
    return JSON.parse(localStorage.getItem("currentUser")!);
  }

  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.socialLogin(userData);
    });
  }

  facebookLogin() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.socialLogin(userData);
    });
  }

  socialLogin(userData: any) {
    this.http.get<any>(this.URL + '/user/email/' + userData.email).subscribe(
      (res) => {
        if (res === false) {
          this.register(userData.name, userData.email, userData.id, userData.photoUrl);
        }
        else {
          this.login(userData.email, userData.id);
        }
      },
      (err) => {
        localStorage.setItem('currentUser', JSON.stringify(null));
      },
    );
  }

  login(email: string, password: string) {
    const loginCreds = {
      email: email,
      password: password,
    }

    this.http.post<any>(this.URL + '/user/login', loginCreds).subscribe(
      (res) => {
        this.cookieService.set('userId', res._id, {path: '/'});
        this.cookieService.set('userRole', res.role, {path: '/'});
        localStorage.setItem('currentUser', JSON.stringify({
          name: res.name,
          email: res.email,
          photoUrl: res.photoUrl,
          interests: res.interests
        }));
      },
      (err) => {
        this.cookieService.delete('userId',"/");
        this.cookieService.delete('userRole',"/");
        localStorage.setItem('currentUser', JSON.stringify(null));
      },
    );
  }

  register(name: string, email: string, password: string, photoUrl: string) {
    const postItem: UserItemC = {
      name: name,
      email: email,
      password: password,
      interests: [],
      photoUrl: photoUrl,
      role: "user"
    }

    this.http.post<any>(this.URL + '/user', postItem).subscribe(
      (res) => {
        localStorage.setItem('currentUser', JSON.stringify({
          name: res.data.name,
          email: res.data.email,
          photoUrl: res.data.photoUrl,
          interests: res.data.interests
        }));
        this.cookieService.set('userId', res.data._id, {path: '/'});
        this.cookieService.set('userRole', res.data.role, {path: '/'});
      },
      (err) => {
        this.cookieService.delete('userId',"/");
        this.cookieService.delete('userRole',"/");
        localStorage.setItem('currentUser', JSON.stringify(null));
      },
    );
  }
}

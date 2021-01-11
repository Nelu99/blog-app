import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ApiConfig } from '../services/ApiConfig';
import { UserItemC } from '../user/UserItemC';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  URL = ApiConfig.url;

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router, private authService: SocialAuthService) { }

  ngOnInit(): void {
    const form = document.getElementById('searchForm')!;
    form.addEventListener('submit', (event) => { event.preventDefault(); this.onSubmit() });
  }

  loginListener() {
    if (document.getElementById('navbarDropdownMenuLink')!.getAttribute('aria-expanded') == "false") {
      (<HTMLInputElement>document.getElementById("loginMsg")).innerText = "";
      const loginForm = document.getElementById('loginForm')!;
      loginForm.addEventListener('submit', (event) => { event.preventDefault(); this.onLogin() });
    }
  }

  onSubmit() {
    this.router.navigate(['explore/' + (<HTMLInputElement>document.getElementById("search")).value]);
  }

  public getUser() {
    return JSON.parse(localStorage.getItem("currentUser")!);
  }

  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.socialLogin(userData);;
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

  public isAdmin() {
    return this.cookieService.get("userRole") == "admin";
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

  logOut() {
    this.authService.signOut();
    this.cookieService.delete('userId',"/");
    this.cookieService.delete('userRole',"/");
    localStorage.setItem("currentUser", JSON.stringify(null));
  }

  onLogin() {
    (<HTMLInputElement>document.getElementById("loginMsg")).innerText = "";
    const loginCreds = {
      email: (<HTMLInputElement>document.getElementById("loginemail")).value,
      password: (<HTMLInputElement>document.getElementById("loginpassword")).value,
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
        (<HTMLInputElement>document.getElementById("loginMsg")).innerText = err.error.message;
        this.cookieService.delete('userId',"/");
        this.cookieService.delete('userRole',"/");
        localStorage.setItem('currentUser', JSON.stringify(null));
      },
    );
  }
}
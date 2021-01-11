import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserItemC } from '../user/UserItemC';
import { ApiConfig } from '../services/ApiConfig';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  URL = ApiConfig.url + '/user';

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const form = document.getElementById('postForm')!;
    form.addEventListener('submit', (event) => { event.preventDefault(); this.onSubmit() });
  }

  onSubmit() {
    (<HTMLInputElement>document.getElementById("emailMsg")).innerText = "";
    const name = (<HTMLInputElement>document.getElementById("name1")).value + " " + (<HTMLInputElement>document.getElementById("name2")).value;
    const postItem: UserItemC = {
      name: name,
      email: (<HTMLInputElement>document.getElementById("regemail")).value,
      password: (<HTMLInputElement>document.getElementById("regpassword")).value,
      interests: [],
      photoUrl: (<HTMLInputElement>document.getElementById("regphotoUrl")).value == ""
        ? ApiConfig.defaultUserImage : (<HTMLInputElement>document.getElementById("imageLink")).value,
      role: "user"
    }

    this.http.post<any>(this.URL, postItem).subscribe(
      (res) => {
        localStorage.setItem('currentUser', JSON.stringify({
          name: res.data.name,
          email: res.data.email,
          photoUrl: res.data.photoUrl,
          interests: res.data.interests
        }));
        this.cookieService.set('userId', res.data._id, { path: '/' });
        this.cookieService.set('userRole', res.data.role, { path: '/' });
        this.router.navigate(['explore']);
      },
      (err) => {
        (<HTMLInputElement>document.getElementById("emailMsg")).innerText = err.error.message;
        this.cookieService.delete('userId',"/");
        this.cookieService.delete('userRole',"/");
        localStorage.setItem('currentUser', JSON.stringify(null));
      },
    );
  }
}

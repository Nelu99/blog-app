import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiConfig } from '../services/ApiConfig';
import { UserItem } from '../user/UserItem';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public userList: UserItem[] | undefined;
  private URL = ApiConfig.url;

  constructor(private cookieService: CookieService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.httpClient.get<UserItem[]>(this.URL + "/user").subscribe(val => {
      this.userList = val;
      console.log(this.userList);
    });
  }

  public deleteUser(item: any) {
    console.log(item);
      this.httpClient.delete<any>(this.URL + "/user/" + item._id).subscribe(val => {
          window.location.reload();
      });
  }

  public isAdmin() {
    return this.cookieService.get('userRole') == 'admin';
  }
}

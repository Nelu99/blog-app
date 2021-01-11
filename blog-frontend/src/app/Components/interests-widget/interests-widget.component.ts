import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PostListItem } from '../posts_list/PostListItem';
import { ApiConfig } from '../services/ApiConfig';

@Component({
  selector: 'app-interests-widget',
  templateUrl: './interests-widget.component.html',
  styleUrls: ['./interests-widget.component.css']
})
export class InterestsWidgetComponent implements OnInit {
  private URL = ApiConfig.url;

  constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  public getUser() {
    return JSON.parse(localStorage.getItem("currentUser")!);
  }

  removeInterest(interest: string) {
    const data = {
      interest: interest
    }
    
    this.httpClient.patch<PostListItem>(this.URL + '/user/remove/' + this.cookieService.get('userId'), data).subscribe(
      (res) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
      },
      (err) => { },
    );
  }
}

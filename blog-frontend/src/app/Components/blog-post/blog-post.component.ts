import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PostListItem } from '../posts_list/PostListItem';
import { ApiConfig } from '../services/ApiConfig';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  private readonly URL = ApiConfig.url + '/blog';
  private routeSub: Subscription | undefined;
  public post: PostListItem | undefined;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.httpClient.get<PostListItem>(this.URL + "/" + params['id']).subscribe(val =>
        this.post = val);
    });
  }
  
  ngOnDestroy() {
    this.routeSub!.unsubscribe();
  }

}

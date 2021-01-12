import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';
import { PostListItem } from '../posts_list/PostListItem';
import { PostListItemC } from '../posts_list/PostListItemC';
import { ApiConfig } from '../services/ApiConfig';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  private readonly URL = ApiConfig.url;
  private routeSub: Subscription | undefined;
  public postComments: string[][] | undefined;
  public post: PostListItem | undefined;
  private listening: boolean = false;

  constructor(private router: Router, private cookieService: CookieService, private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cookieService.delete('writerId', '/post');
    this.routeSub = this.route.params.subscribe(params => {
      this.httpClient.get<any>(this.URL + "/blog/" + params['id']).subscribe(val => {
        this.postComments = val.comments;
        this.post = {
          id: val.id,
          title: val.title,
          description: val.description,
          imageLink: val.imageLink,
          content: val.content,
          interest: val.interest,
          writer: val.writer,
          writerId: "hidden",
          likes: val.likes,
          comments: val.comments,
          date: val.date,
        };
        this.cookieService.set('writerId', val.writerId, { path: '/' });
        this.initShareLinks();
      });
    });

    const form = document.getElementById('postForm')!;
    form.addEventListener('submit', (event) => { event.preventDefault(); this.onUpdate() });
  }

  isOwnBlog() {
    if(this.cookieService.get('userRole') == "admin"){
      return true;
    }
    return this.cookieService.get('userId') == this.cookieService.get('writerId');
  }

  isOwnComment(item: string[]) {
    if(this.cookieService.get('userRole') == "admin"){
      return true;
    }
    if(item[3] == this.cookieService.get('userId')){
      return true;
    }
    return this.cookieService.get('userId') == this.cookieService.get('writerId');
  }

  initShareLinks() {
    let postUrl = encodeURI(document.location.href);
    let postTitle = encodeURI(`Check out "${this.post?.title}", by ${this.post?.writer} on Interest blog: `);
    let postImg = encodeURI(this.post?.imageLink!);


    const facebookBtn = document.querySelector(".facebook-btn");
    const twitterBtn = document.querySelector(".twitter-btn");
    const pinterestBtn = document.querySelector(".pinterest-btn");
    const linkedinBtn = document.querySelector(".linkedin-btn");
    const whatsappBtn = document.querySelector(".whatsapp-btn");

    facebookBtn!.setAttribute(
      "href",
      `https://www.facebook.com/sharer.php?u=${postUrl}`
    );
    twitterBtn!.setAttribute(
      "href",
      `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
    );
    pinterestBtn!.setAttribute(
      "href",
      `https://pinterest.com/pin/create/bookmarklet/?media=${postImg}&url=${postUrl}&description=${postTitle}`
    );

    linkedinBtn!.setAttribute(
      "href",
      `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`
    );
    whatsappBtn!.setAttribute(
      "href",
      `https://wa.me/?text=${postTitle} ${postUrl}`
    );
  }

  autogrow(textArea: HTMLElement) {
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';


    if (!this.listening) {
      const form = document.getElementById('commentForm')!;
      form.addEventListener('submit', (event) => { event.preventDefault(); this.onSubmit() });
      this.listening = true;
    }
  }

  ngOnDestroy() {
    this.routeSub!.unsubscribe();
    this.cookieService.delete('writerId', '/');
    this.cookieService.delete('writerId', '/post');
  }

  addInterest(interest: string | undefined) {
    const data = {
      interest: interest
    }

    this.httpClient.patch<PostListItem>(this.URL + '/user/' + this.cookieService.get('userId'), data).subscribe(
      (res: any) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
      },
      (err: any) => {
      },
    );
  }

  public getUser() {
    return JSON.parse(localStorage.getItem("currentUser")!);
  }

  onUpdate() {
    if (!this.isOwnBlog()) {
      return;
    }
    const postItem: PostListItemC = {
      title: (<HTMLInputElement>document.getElementById("title")).value,
      description: (<HTMLInputElement>document.getElementById("txtDesc")).value,
      interest: (<HTMLInputElement>document.getElementById("interest")).value,
      content: (<HTMLInputElement>document.getElementById("txtContent")).value,
      imageLink: (<HTMLInputElement>document.getElementById("imageLink")).value == ""
        ? ApiConfig.defaultImage : (<HTMLInputElement>document.getElementById("imageLink")).value,
      writer: JSON.parse(localStorage.getItem("currentUser")!).name,
      writerId: this.cookieService.get('userId'),
      comments: []
    }

    if (
      postItem.title === this.post?.title &&
      postItem.description === this.post?.description &&
      postItem.imageLink === this.post?.imageLink &&
      postItem.content === this.post?.content &&
      postItem.interest === this.post?.interest
    ) {
      return;
    }

    this.httpClient.patch<any>(this.URL + "/blog/" + this.post?.id, postItem).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {
      },
    );
  }

  onSubmit() {
    const comment = {
      text: (<HTMLInputElement>document.getElementById("comment")).value,
      name: this.getUser().name,
      photoUrl: this.getUser().photoUrl,
      userId: this.cookieService.get('userId')
    }

    this.httpClient.patch<PostListItem>(this.URL + '/blog/comment/' + this.post?.id, comment).subscribe(
      (res: { comments: any; }) => {
        this.postComments = res.comments;
      },
      (err: any) => {
      },
    );
  }

  public deleteBlog() {
    if (!this.isOwnBlog()) {
      return;
    }
    this.httpClient.delete<PostListItem>(this.URL + '/blog/' + this.post?.id).subscribe(
      (res) => {
        this.router.navigate(['explore']);
      },
      (err) => {
      },
    );
  }

  public likeBlog() {
    const data = {
      userId: this.cookieService.get('userId')
    }

    this.httpClient.patch<PostListItem>(this.URL + '/blog/like/' + this.post?.id, data).subscribe(
      (res: any) => {
        this.post = {
          id: res.id,
          title: res.title,
          description: res.description,
          imageLink: res.imageLink,
          content: res.content,
          interest: res.interest,
          writer: res.writer,
          writerId: "hidden",
          likes: res.likes,
          comments: res.comments,
          date: res.date,
        };
      },
      (err: any) => {
      },
    );
  }

  public dislikeBlog() {
    const data = {
      userId: this.cookieService.get('userId')
    }

    this.httpClient.patch<PostListItem>(this.URL + '/blog/dislike/' + this.post?.id, data).subscribe(
      (res: any) => {
        this.post = {
          id: res.id,
          title: res.title,
          description: res.description,
          imageLink: res.imageLink,
          content: res.content,
          interest: res.interest,
          writer: res.writer,
          writerId: "hidden",
          likes: res.likes,
          comments: res.comments,
          date: res.date,
        };
      },
      (err: any) => {
      },
    );
  }

  public alreadyLikedBlog() {
    return this.post?.likes.includes(this.cookieService.get('userId'));
  }

  public getName(item: string[]){
    return item[0];
  }

  public getText(item: string[]){
    return item[1];
  }

  public getPhoto(item: string[]){
    return item[2];
  }

  public removeComment(item: string[]) {
    const data = {
      name: item[0],
      text: item[1],
      photoUrl: item[2]
    }

    this.httpClient.patch<PostListItem>(this.URL + '/blog/comment/delete/' + this.post?.id, data).subscribe(
      (res: any) => {
        this.postComments = res.comments;
        this.post = {
          id: res.id,
          title: res.title,
          description: res.description,
          imageLink: res.imageLink,
          content: res.content,
          interest: res.interest,
          writer: res.writer,
          writerId: "hidden",
          likes: res.likes,
          comments: res.comments,
          date: res.date,
        };
      },
      (err: any) => {
      },
    );
  }
}

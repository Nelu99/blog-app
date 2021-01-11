import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PostService } from '../services/PostService';
import { PostListItem } from '../posts_list/PostListItem';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConfig } from '../services/ApiConfig';
import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-post-list',
    templateUrl: './postList.html',
    styleUrls: ['./postListCSS.css']
})

export class PostListComponent implements OnInit {
    public title: string | undefined;
    private routeSub: Subscription | undefined;
    public postList: PostListItem[] | undefined;
    private URL = ApiConfig.url;

    constructor(private cookieService: CookieService, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private postService: PostService) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['interest'] && params['interest'] != "") {
                this.httpClient.get<PostListItem[]>(this.URL + "/blog/posts/" + params['interest']).subscribe(val => {
                    this.postList = val;
                });
                this.title = "What's new in " + params['interest'].toLowerCase() + "?";
            }
            else {
                this.httpClient.get<PostListItem[]>(this.URL + "/blog").subscribe(val => {
                    this.postList = val;
                });
                this.title = "Discover";
            }
        });
    }

    public getPostsByUserInterests() {
        this.title = "For me"
        this.postList = undefined;
        const interests = this.getUser().interests;
        interests.forEach((element: any) => {
            this.httpClient.get<PostListItem[]>(this.URL + "/blog/posts/" + element).subscribe(val => {
                if (!this.postList) {
                    this.postList = val;
                }
                else {
                    val.forEach(item => {
                        this.postList?.push(item);
                    });
                }
            });
        });
    }

    public getPostsGlobal() {
        this.httpClient.get<PostListItem[]>(this.URL + "/blog").subscribe(val => {
            this.postList = val;
        });
        this.title = "Discover";
    }

    getUser() {
        return JSON.parse(localStorage.getItem("currentUser")!);
    }

    addInterest(interest: string | undefined) {
        const data = {
            interest: interest
        }

        this.httpClient.patch<PostListItem>(this.URL + '/user/' + this.cookieService.get('userId'), data).subscribe(
            (res: any) => {
                localStorage.setItem('currentUser', JSON.stringify(res));
            },
            (err: any) => { },
        );
    }

    public alreadyLikedBlog(item: any) {
        return item?.likes?.includes(this.cookieService.get('userId'));
    }

    public likeBlog(id: any) {
        const data = {
            userId: this.cookieService.get('userId')
        }

        this.httpClient.patch<PostListItem>(this.URL + '/blog/like/' + id, data).subscribe(
            (res: any) => {
                this.postList?.forEach((item, index) => {
                    if (item.id === id) {
                        item.likes = res.likes;
                    }
                });
            },
            (err: any) => {
                window.alert(err.message);
            },
        );
    }

    public dislikeBlog(id: any) {
        const data = {
            userId: this.cookieService.get('userId')
        }

        this.httpClient.patch<PostListItem>(this.URL + '/blog/dislike/' + id, data).subscribe(
            (res: any) => {
                this.postList?.forEach((item, index) => {
                    if (item.id === id) {
                        item.likes = res.likes;
                    }
                });
            },
            (err: any) => {
                window.alert(err.message);
            },
        );
    }
}

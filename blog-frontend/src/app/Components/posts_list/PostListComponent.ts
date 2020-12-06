import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PostService } from '../services/PostService';
import { PostListItem } from '../posts_list/PostListItem';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-post-list',
    templateUrl: './postList.html'
})

export class PostListComponent implements OnInit {
    public title: string | undefined;
    private routeSub: Subscription | undefined;
    public postList: Observable<PostListItem[]> | undefined;
    constructor(private route: ActivatedRoute, private postService: PostService) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['interest'] && params['interest'] != "") {
                this.postList = this.postService.getPostsByInterest(params['interest']);
                this.title = "Posts about " + params['interest'].toLowerCase();
            }
            else {
                this.postList = this.postService.getAllPostItems();
                this.title = "Popular";
            }
        });
    }
}

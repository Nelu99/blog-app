import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../services/PostService';
import {PostListItem} from '../posts_list/PostListItem';

@Component({
    selector:'app-post-list',
    templateUrl:'./postList.html'
})

export class PostListComponent implements OnInit{
    public postList:Observable<PostListItem[]> | undefined;
    constructor(private postService:PostService){

    }

    ngOnInit(){
        this.postList = this.postService.getAllPostItems();
    }
}

import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {PostListItem} from '../posts_list/PostListItem';
import {PostResource} from '../services/PostResource';

@Injectable()
export class PostService{

    constructor(private postResource:PostResource){

    }

    public getAllPostItems():Observable<PostListItem[]>{
        return this.postResource.getBlogs();
    }
}
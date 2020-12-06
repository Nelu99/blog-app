import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { PostListItem } from '../posts_list/PostListItem';
import { ApiConfig } from './ApiConfig';

@Injectable()
export class PostResource{

    private readonly URL = ApiConfig.url + '/blog';
    constructor(private httpClient:HttpClient){

    }

    public getBlogs():Observable<PostListItem[]> {
        return this.httpClient.get<PostListItem[]>(this.URL);
    }
}
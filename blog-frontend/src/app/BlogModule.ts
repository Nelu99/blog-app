import {NgModule} from '@angular/core';
import { PostListModule } from './Components/posts_list/PostListModule';
import { PostResource } from './Components/services/PostResource';
import { PostService } from './Components/services/PostService';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports:[
        PostListModule,
        HttpClientModule
    ],
    exports:[PostListModule],
    declarations:[],
    providers:[
        PostService,
        PostResource
    ]
})

export class BlogModule{

}
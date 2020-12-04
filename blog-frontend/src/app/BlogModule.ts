import {NgModule} from '@angular/core';
import { PostListModule } from './Components/posts_list/PostListModule';
import { PostResource } from './Components/services/PostResource';
import { PostService } from './Components/services/PostService';

@NgModule({
    imports:[
        PostListModule
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
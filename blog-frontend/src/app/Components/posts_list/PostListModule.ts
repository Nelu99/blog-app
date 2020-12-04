import {NgModule} from '@angular/core';
import { PostListComponent } from './PostListComponent';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PostService } from '../services/PostService';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
    imports:[MatCardModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule],
    exports:[PostListComponent],
    declarations:[PostListComponent],
    providers:[PostService]
})

export class PostListModule{

}

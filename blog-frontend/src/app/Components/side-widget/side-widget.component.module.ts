import {NgModule} from '@angular/core';
import { SideWidgetComponent } from './side-widget.component'
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PostService } from '../services/PostService';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    imports:[MatCardModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule],
    exports:[SideWidgetComponent],
    declarations:[SideWidgetComponent],
    providers:[PostService, CookieService]
})

export class SideWidgetModule{

}
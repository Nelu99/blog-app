import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostResource } from './Components/services/PostResource';

@Component({
  selector: 'app-root',
  providers: [PostResource, CookieService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interest';

  constructor(private titleService: Title, private meta: Meta, private route: ActivatedRoute) {
    titleService.setTitle('Interest Blog');

    meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }, true)
    meta.addTag({ name: 'description', content: 'TW Project' }, true)
    meta.addTag({ name: 'author', content: 'Maciuca Nelu, Iusan Catalin, Finaru Dragos' }, true)
  }
}

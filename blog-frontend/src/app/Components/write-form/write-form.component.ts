import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostListItemC } from '../posts_list/PostListItemC'
import { ApiConfig } from '../services/ApiConfig';


@Component({
  selector: 'app-write-form',
  templateUrl: './write-form.component.html',
  styleUrls: ['./write-form.component.css']
})

export class WriteFormComponent implements OnInit {
  URL = ApiConfig.url + '/blog';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const form = document.getElementById('postForm')!;
    form.addEventListener('submit', (event) => {event.preventDefault(); this.onSubmit()});
  }

  autogrow(textArea: HTMLElement) {
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  onSubmit() {
    const postItem: PostListItemC = {
      title: (<HTMLInputElement>document.getElementById("title")).value,
      description: (<HTMLInputElement>document.getElementById("txtDesc")).value,
      interest: (<HTMLInputElement>document.getElementById("interest")).value,
      content: (<HTMLInputElement>document.getElementById("txtContent")).value,
      imageLink: (<HTMLInputElement>document.getElementById("imageLink")).value == ""
        ? ApiConfig.defaultImage : (<HTMLInputElement>document.getElementById("imageLink")).value
    }

    this.http.post<any>(this.URL, postItem).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['explore']);
      },
      (err) => {
        console.log(err);
        this.router.navigate(['explore']);
      },
    );
  }

}

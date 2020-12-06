import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const form = document.getElementById('searchForm')!;
    form.addEventListener('submit', (event) => {event.preventDefault(); this.onSubmit()});
  }

  onSubmit() {
    this.router.navigate(['explore/' + (<HTMLInputElement>document.getElementById("search")).value]);
  }

}
import {Component, OnInit} from '@angular/core';

@Component({
    selector:'app-post-list',
    templateUrl:'postList.html'
})

export class PostListComponent implements OnInit{
    public postList= postList;
    constructor(){

    }

    ngOnInit(){

    }
}

const postList = [
    {
        title:"t1",
        description:"d1",
        imageLink:"https://material.angular.io/assets/img/examples/shiba2.jpg",
        content:"none",
        interest:"running"
    },
    {
        title:"t1",
        description:"d1",
        imageLink:"https://material.angular.io/assets/img/examples/shiba2.jpg",
        content:"none",
        interest:"running"
    }
    ,{
        title:"t1",
        description:"d1",
        imageLink:"https://material.angular.io/assets/img/examples/shiba2.jpg",
        content:"none",
        interest:"running"
    }
]
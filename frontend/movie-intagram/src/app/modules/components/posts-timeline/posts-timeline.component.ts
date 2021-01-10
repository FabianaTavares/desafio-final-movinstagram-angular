import { Component, Input, OnInit, Output } from '@angular/core';
import { PostsDTO } from '../../models/movie-posts.model';

@Component({
  selector: 'app-posts-timeline',
  templateUrl: './posts-timeline.component.html',
  styleUrls: ['./posts-timeline.component.scss']
})
export class PostsTimelineComponent implements OnInit {

  @Input() postsListas: PostsDTO[] = [];
  @Output() idPostComentsItem: PostsDTO[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.postsListas);
  }

}

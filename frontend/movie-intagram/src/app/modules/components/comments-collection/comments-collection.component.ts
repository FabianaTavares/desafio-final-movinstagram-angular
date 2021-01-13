import { LikesDTO } from './../../models/movie-likes.model';
import { QtdsDTO } from './../../models/movie-qtds.model';
import { CommentsDTO } from './../../models/movie-comments.model';
import { PostsDTO } from './../../models/movie-posts.model';
import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-comments-collection',
  templateUrl: './comments-collection.component.html',
  styleUrls: ['./comments-collection.component.scss']
})
export class CommentsCollectionComponent implements OnInit {

  @Input()
  idPostComentsItem!: PostsDTO[];
  listCommentsByPost!: CommentsDTO[];
  listLikesByPost!: LikesDTO[];

  qtdComentarios!: number;
  qtdCurtidas!: number;
  usersLikes: string[] = [];

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.recuperaCommentariosPorPost();
    this.recuperaLikesPorPost();
  }

  // tslint:disable-next-line: typedef
  recuperaCommentariosPorPost() {
    const id: string = this.idPostComentsItem.id;
    this.movieService.getCommentsListByPostId(id).subscribe(
      (response) => {
        this.listCommentsByPost = response;
        this.qtdComentarios = response.length;
      }
    );
  }

  recuperaLikesPorPost() {
    const listUsers: string[] = [];
    this.movieService.getLikesListByPostId(this.idPostComentsItem.id).subscribe(
      (response: any[]) => {
        this.qtdCurtidas = response.length;
        this.listLikesByPost = response;

        response.forEach(u => {
          listUsers.push(u.user);
        });
        this.usersLikes = listUsers;
        console.log(this.usersLikes);
      }
    );
  }

}

import { forkJoin } from 'rxjs';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CommentsDTO } from '../../models/movie-comments.model';
import { LikesDTO } from '../../models/movie-likes.model';
import { PostsDTO } from '../../models/movie-posts.model';
import { MovieService } from '../../services/movie.service';
import { PostComComentariosDTO } from '../../models/movie-posts-coments.model';
import { BestFriendsDTO } from './../../models/movie-best-friends.model';
@Component({
  selector: 'app-posts-timeline',
  templateUrl: './posts-timeline.component.html',
  styleUrls: ['./posts-timeline.component.scss']
})
export class PostsTimelineComponent implements OnInit {

  postsListas!: PostsDTO[];
  comentsListas: CommentsDTO[] = [];
  likesDTO: LikesDTO[] = [];
  bestfriend: BestFriendsDTO[] = [];
  loading: boolean = false;
  testes: PostComComentariosDTO[] = [];
  userSelected!: string;

  usersLikes!: number;
  qtdCurtidas!: number;
  qtdComentarios!: number;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.recuperaListaPosts();
  }

  recuperaListaPosts() {
    const buscaServicos = forkJoin([
      this.movieService.getPostsList(),
      this.movieService.getCommentsList(),
      this.movieService.getLikesList(),
      this.movieService.getBestFriendList(),
    ]);

    buscaServicos.subscribe(
      ([posts, coments, likes, bestFriends]: [PostsDTO[], CommentsDTO[], LikesDTO[], BestFriendsDTO[]]) => {

        const postsMap = new Map<string, PostComComentariosDTO>();
        for (const post of posts) {
          postsMap.set(post.id, { ...post, coments: [], likes: [] });
        }
        for (const coment of coments) {
          postsMap.get(coment.postId)?.coments?.push(coment);
        }
        for (const like of likes) {
          postsMap.get(like.postId)?.likes?.push(like);
        }

        this.testes = Array.from(postsMap.values());

        this.bestfriend = bestFriends;

      }
    );
  }

  likeHeartPost(item: PostComComentariosDTO){
    console.log('oi');
    console.log(item);
    console.log(this.userSelected);

    this.movieService.getUsuarioLogadoEvent().subscribe(
      (item: any) => {
        console.log(item);
        //this.selectedNavItem(item)
      }
    );
  }

}

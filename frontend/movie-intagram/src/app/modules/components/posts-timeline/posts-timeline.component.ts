import { forkJoin, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
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
  userSelected: string = '';
  subscription!: Subscription;

  usersLikes!: number;
  qtdCurtidas!: number;
  qtdComentarios!: number;
  public isActive:boolean = false;

  constructor(
    private movieService: MovieService
  ) {
    this.subscription = this.movieService.getUsuarioLogadoEvent().subscribe(
      (usuarioTab: any) => {
        console.log(usuarioTab);
        this.userSelected = usuarioTab;
      }
    );
   }

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
          postsMap.get(like.postId)?.likes?.push(like.user);
        }

        this.testes = Array.from(postsMap.values());

        this.bestfriend = bestFriends;

      }
    );
  }

  userJaCurtiu(item: PostComComentariosDTO): boolean {
    console.log(item);
    console.log(this.userSelected);
    console.log(item.likes.indexOf(this.userSelected));
    return item.likes.indexOf(this.userSelected) === -1 ? true : false;
  }

  likeHeartPost(item: PostComComentariosDTO){
    this.isActive = !this.isActive;
    const index = item?.likes?.indexOf(this.userSelected);
    console.log(index);
    if (index == -1) {
      item.likes.push(this.userSelected);
      //this.isActive = true;
    } else {
      item.likes.splice(index, 1);
      //this.isActive = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

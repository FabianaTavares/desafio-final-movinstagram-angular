import { BestFriendsDTO } from './../models/movie-best-friends.model';
import { LikesDTO } from './../models/movie-likes.model';
import { CommentsDTO } from './../models/movie-comments.model';
import { environment } from './../../../environments/environment';
import { PostsDTO } from './../models/movie-posts.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private usuarioLogado$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  setUsuarioLogadoEvent(valor: string | undefined){
    console.log(valor);
    this.usuarioLogado$.next(valor);
  }

  getUsuarioLogadoEvent(){
    return this.usuarioLogado$.asObservable();
  }

  /**
   * @description COMMENTS
   */
  getPostsList(): Observable<Array<PostsDTO>> {
    return this.http.get<Array<PostsDTO>>(`${environment.API_URL}/posts`);
  }

  /**
   * @description COMMENTS
   */
  getCommentsList(): Observable<Array<CommentsDTO>> {
    return this.http.get<Array<CommentsDTO>>(`${environment.API_URL}/comments`);
  }

  /**
   * @description LIKES
   */
  getLikesList(): Observable<Array<LikesDTO>> {
    return this.http.get<Array<LikesDTO>>(`${environment.API_URL}/likes`).pipe(
      delay(2000),
    );
  }

  /**
   * @description FRIENDS
   */
  getBestFriendList(): Observable<Array<BestFriendsDTO>> {
    return this.http.get<Array<BestFriendsDTO>>(`${environment.API_URL}/bestFriends`).pipe(
      delay(2000),
    );
  }



}

import { BestFriendsDTO } from './../models/movie-best-friends.model';
import { LikesDTO } from './../models/movie-likes.model';
import { CommentsDTO } from './../models/movie-comments.model';
import { environment } from './../../../environments/environment';
import { PostsDTO } from './../models/movie-posts.model';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, forkJoin, from, of, combineLatest } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, delay, take, map, mergeMap, switchMap, toArray, flatMap } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  @Output() usuarioLogado: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  setUsuarioLogadoEvent(valor: string | undefined){
    console.log(valor);
    this.usuarioLogado.emit(valor);
  }

  getUsuarioLogadoEvent(){
    console.log(this.usuarioLogado);
    return this.usuarioLogado;
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

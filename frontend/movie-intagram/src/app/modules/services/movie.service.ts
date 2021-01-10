import { BestFriendsDTO } from './../models/movie-best-friends.model';
import { LikesDTO } from './../models/movie-likes.model';
import { CommentsDTO } from './../models/movie-comments.model';
import { environment } from './../../../environments/environment';
import { PostsDTO } from './../models/movie-posts.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @description COMMENTS
   */
  getPostsList(): Observable<Array<PostsDTO>> {
    return this.http.get<Array<PostsDTO>>(`${environment.API_URL}/posts`).pipe(
      delay(2000),
    );
  }

  getPostsListById(id?: string): Observable<Array<PostsDTO>> {
    return this.http.get<Array<PostsDTO>>(`${environment.API_URL}/posts/${id}`).pipe(take(1));
  }

  getPostsListByUser(user?: string): Observable<Array<PostsDTO>> {
    return this.http.get<Array<PostsDTO>>(`${environment.API_URL}/posts/${user}`).pipe(take(1));
  }


  /**
   * @description COMMENTS
   */
  getCommentsList(): Observable<Array<CommentsDTO>> {
    return this.http.get<Array<CommentsDTO>>(`${environment.API_URL}/comments`).pipe(
      delay(2000),
    );
  }

  getCommentsListById(id?: string): Observable<Array<CommentsDTO>> {
    return this.http.get<Array<CommentsDTO>>(`${environment.API_URL}/comments/${id}`).pipe(take(1));
  }

  getCommentsListByPostId(postId: string): Observable<Array<CommentsDTO>> {
    const params = new HttpParams().append('postId', postId);

    return this.http.get<Array<CommentsDTO>>(`${environment.API_URL}/comments`, {
      params
    }).pipe(take(1));
  }

  getCommentsListByUser(user?: string): Observable<Array<CommentsDTO>> {
    return this.http.get<Array<CommentsDTO>>(`${environment.API_URL}/comments/${user}`).pipe(take(1));
  }

  /**
   * @description LIKES
   */
  getLikesList(): Observable<Array<LikesDTO>> {
    return this.http.get<Array<LikesDTO>>(`${environment.API_URL}/likes`).pipe(
      delay(2000),
    );
  }

  getLikesListById(postId: string): Observable<Array<LikesDTO>> {
    const params = new HttpParams().append('postId', postId);
    return this.http.get<Array<LikesDTO>>(`${environment.API_URL}/likes`, {
      params
    }).pipe(take(1));
  }

  getLikesListByPostId(postId: string): Observable<Array<LikesDTO>> {
    const params = new HttpParams().append('postId', postId);
    return this.http.get<Array<LikesDTO>>(`${environment.API_URL}/likes`, {
      params
    }).pipe(take(1));
  }

  getLikesListByUser(user?: string): Observable<Array<LikesDTO>> {
    return this.http.get<Array<LikesDTO>>(`${environment.API_URL}/likes/${user}`).pipe(take(1));
  }

  /**
   * @description LIKES
   */
  getBestFriendList(): Observable<Array<BestFriendsDTO>> {
    return this.http.get<Array<BestFriendsDTO>>(`${environment.API_URL}/bestFriends`).pipe(
      delay(2000),
    );
  }

}

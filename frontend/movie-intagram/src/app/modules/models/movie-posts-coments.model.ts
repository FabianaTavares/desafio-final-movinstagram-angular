import { LikesDTO } from './movie-likes.model';
import { CommentsDTO } from "./movie-comments.model";

export interface PostComComentariosDTO {
  coments?: CommentsDTO;
  likes?: LikesDTO;
}

import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MovieService } from './services/movie.service';
import { TimelineComponent } from './components/timeline/timeline.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PostsTimelineComponent } from './components/posts-timeline/posts-timeline.component';
import { CommentsCollectionComponent } from './components/comments-collection/comments-collection.component';

@NgModule({
  declarations: [
    TimelineComponent,
    HeaderComponent,
    PostsTimelineComponent,
    CommentsCollectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MovieRoutingModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  exports: [
    TimelineComponent,
    HeaderComponent,
    PostsTimelineComponent,
    CommentsCollectionComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    MovieService
  ]
})
export class MovieModule { }

import { Component, Input, OnInit, Output } from '@angular/core';
import { PostsDTO } from '../../models/movie-posts.model';
import { QtdsDTO } from '../../models/movie-qtds.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  qtdPosts!: number;

  @Input()
  qtdComentarios!: number;

  @Input()
  qtdCurtidas!: number;

  listAtivos: any[] = [
    { img: "assets/img/batman.png", user: "batman" },
    { img: "assets/img/superman.png", user: "superman" },
    { img: "assets/img/wonderWoman.png", user: "wonderWoman" }
  ];

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {

  }

  selectTab(tab: any) {
    console.log('oi');
    console.log(tab);
    this.listAtivos.forEach((tab) => {
      console.log(tab);
      tab.active = false;
    });
    tab.active = true
  }

}

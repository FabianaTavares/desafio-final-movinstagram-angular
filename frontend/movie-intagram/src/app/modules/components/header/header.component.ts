import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { BestFriendsDTO } from '../../models/movie-best-friends.model';
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


  @ViewChild('staticTabs', { static: false }) staticTabs!: TabsetComponent;

  activeElement: number = 1;
  userSelected!: BestFriendsDTO;

  listAtivos: any[] = [
    { id:1, img: "assets/img/batman.png", user: "batman" },
    { id:2, img: "assets/img/superman.png", user: "superman"},
    { id:3, img: "assets/img/wonderWoman.png", user: "wonderWoman" }
  ];

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {

  }

  selectTab(index: number, user: any) {
    this.activeElement = index;
    console.log(user);
    //verificar como vou linkar pra mudar o usuário logado.
    console.log(this.activeElement);
    this.userSelected = user;
    this.movieService.setUsuarioLogadoEvent(user);
  }

}

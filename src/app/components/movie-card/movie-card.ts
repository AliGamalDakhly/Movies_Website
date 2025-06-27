import { Component, inject, OnInit } from '@angular/core';
import { Movies } from '../../services/movies';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MovieItem } from '../../Models/movie-item';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-movie-card',
  imports: [SearchBar,CommonModule, MatButtonModule, MatCardModule,MatPaginatorModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard implements OnInit {
  currrentPage:number = 1;
  totlaPages:number = 0;
  displayedMovies: MovieItem[] = [];

  data = inject(Movies);
  
  ngOnInit() {
    this.data.getMoviesByPage(1);
  }

  pageEvent(page:any){
    console.log(page);
    this.currrentPage = page.pageIndex + 1;
    this.data.getMoviesByPage(this.currrentPage);
    this.totlaPages = page.length;
    this.displayedMovies = this.data.moviesSignal();
  }

}

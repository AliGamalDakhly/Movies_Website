import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { Movies } from '../../services/movies';
import { MovieItem } from '../../Models/movie-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule,FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar{
 Allmovies = inject(Movies);
 searchText: string = '';
 SearchedMovies: MovieItem[] = [];

  ngOnInit() {
    document.body.removeAttribute('dir');
    this.Allmovies.getMoviesByPage(1,this.Allmovies.language);
  }

  movieSearch() {
    this.Allmovies.getMovieByName(this.searchText);
    this.SearchedMovies = this.Allmovies.moviesSignal();
  }

  Reset(){
      this.searchText = ''
      this.Allmovies.getMoviesByPage(1,this.Allmovies.language);
      this.SearchedMovies = this.Allmovies.moviesSignal();
      return;
  }
}

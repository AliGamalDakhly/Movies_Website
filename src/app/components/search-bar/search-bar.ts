import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { Movies } from '../../services/movies';
import { MovieItem } from '../../Models/movie-item';
import { FormsModule } from '@angular/forms';
import { Language } from '../../services/language';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule,FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar{
 Allmovies = inject(Movies);
 languageService =inject(Language);
 language = 'en';
 searchText: string = '';
 SearchedMovies: MovieItem[] = [];

  ngOnInit() {
    document.body.removeAttribute('dir');
    this.Allmovies.getMoviesByPage(1,this.Allmovies.language);
    this.languageService.language$.subscribe(lang => {
      this.language = lang;
      
      document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    });
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

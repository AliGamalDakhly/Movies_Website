import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Language } from './language';
import { GenreItem } from '../Models/genre-item';
import { MovieItem } from '../Models/movie-item';
import { Genre } from '../Models/genre';
import { MovieList } from '../Models/movie-list';


@Injectable({ providedIn: 'root' })
export class GenresService {
  private http     = inject(HttpClient);
  private language  = inject(Language);
  private base     = 'https://api.themoviedb.org/3';

  
  readonly genres: WritableSignal<GenreItem[]> = signal([]);

  
  readonly moviesByGenre = signal<Record<number, MovieItem[]>>({});

  constructor() {
    
    this.language.language$.subscribe(lang => {
      this.moviesByGenre.set({});
      this.loadGenres(lang);
    });
  }

  loadGenres(lang = this.language.currentLanguage) {
    const url = `${this.base}/genre/movie/list?api_key=${environment.movieApiKey}&language=${lang}`;
    this.http.get<Genre>(url).subscribe(res => this.genres.set(res.genres));
  }

  loadMoviesFor(genreId: number, page = 1) {
    if (this.moviesByGenre()[genreId]) return;    

    const lang = this.language.currentLanguage;
    const url =
      `${this.base}/discover/movie?api_key=${environment.movieApiKey}` +
      `&language=${lang}&with_genres=${genreId}&page=${page}`;

    this.http.get<MovieList>(url).subscribe(list => {
      this.moviesByGenre.set({
        ...this.moviesByGenre(),
        [genreId]: list.results
      });
    });
  }
}

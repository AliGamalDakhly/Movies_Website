import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MovieList } from '../Models/movie-list';
import { MovieItem } from '../Models/movie-item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Movies {

  baseAPIURL = "https://api.themoviedb.org/3";
  pageNumber:number=1;
  HttpFetchData = inject(HttpClient);
  searchBaseURL:string = "https://api.themoviedb.org/3/search/movie?api_key=";
  MovieByName: MovieItem[] = [];
  language:string="en";
  //create signal
  moviesSignal = signal<MovieItem[]>([]);
  imagesBaseURL = "https://image.tmdb.org/t/p/w500";

  // getMovieByLanguage(language:string,page:number){
  //   this.HttpFetchData.get<MovieList>(`${this.baseAPIURL}/movie/now_playing?api_key=${environment.firebaseConfig.apiKey}&language=${language}&page=${page}`).subscribe(
  //     movies => {
  //       this.moviesSignal.set(movies.results);
  //       this.pageNumber=movies.page;
  //       console.log(this.moviesSignal());
  //     })
  // }
  getMoviesByPage(page:number,language:string) {
    this.HttpFetchData.get<MovieList>(`${this.baseAPIURL}/movie/now_playing?api_key=${environment.firebaseConfig.apiKey}&language=${language}&page=${page}`).subscribe(
      movies =>{
        this.moviesSignal.set(movies.results);
        this.language = language;
        this.pageNumber=movies.page;
        console.log(this.moviesSignal());
      }
    );
  }

  getMovieByName(name: string) {
    this.HttpFetchData.get<MovieList>(`${this.searchBaseURL}${environment.firebaseConfig.apiKey}&query=${name}`).subscribe(
      movie => {
        this.MovieByName = movie.results;
        this.moviesSignal.set(this.MovieByName);
      }
    )
  }

  

}

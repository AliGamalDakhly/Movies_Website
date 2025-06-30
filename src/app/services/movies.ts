import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MovieList } from '../Models/movie-list';
import { MovieItem } from '../Models/movie-item';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Movies {
constructor(private http: HttpClient) {} 
  baseAPIURL = "https://api.themoviedb.org/3";
  pageNumber:number=0;
  HttpFetchData = inject(HttpClient);
  searchBaseURL:string = "https://api.themoviedb.org/3/search/movie?api_key=";
  MovieByName: MovieItem[] = [];
  MovieById: MovieItem | null = null;
  //create signal
  moviesSignal = signal<MovieItem[]>([]);
  imagesBaseURL = "https://image.tmdb.org/t/p/w500";

  getMoviesByPage(page:number) {
    this.HttpFetchData.get<MovieList>(`${this.baseAPIURL}/movie/now_playing?api_key=${environment.firebaseConfig.apiKey}&page=${page}`).subscribe(
      movies =>{
        this.moviesSignal.set(movies.results);
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

  /* Added By: Ali Gamal */
  getMovieById(Id: number): Observable<MovieItem> {
  const url = `https://api.themoviedb.org/3/movie/${Id}?api_key=${environment.firebaseConfig.apiKey}`;
  return this.HttpFetchData.get<MovieItem>(url);
  }
  /* End Of Code*/
  
getMovieVideos(movieId: number) {
  return this.http.get<any>(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${environment.firebaseConfig.apiKey}`);
}
getRecommendedMovies(movieId: number) {
  return this.http.get<any>(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${environment.firebaseConfig.apiKey}`
  );
}


}

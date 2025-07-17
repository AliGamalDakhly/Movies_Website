import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Movies } from '../../services/movies';
import { MovieItem } from '../../Models/movie-item';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Firebase } from '../../services/firebase';
import { User } from '../../Models/user';
import { firstValueFrom } from 'rxjs';
import { Language } from '../../services/language';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  imports: [CommonModule, NgIf, DatePipe,HttpClientModule,MatCardModule,RouterModule] 
})
export class MovieDetails implements OnInit {
  movie: MovieItem | null = null;
  trailerKey: string | null = null;
  recommendedMovies: MovieItem[] = [];
  trailerUrl: SafeResourceUrl | null = null;
  currentUser: User | null = null;
  language: string = 'en';

  constructor(private route: ActivatedRoute,
              private movieService: Movies,
              private sanitizer: DomSanitizer,
              private languageService: Language,
              private firebaseService: Firebase) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const movieId = +params.get('id')!;
    this.loadMovieDetails(movieId);
  });

  // Init Firebase (once)
  this.firebaseService.Init().then(() => {
    this.currentUser = this.firebaseService.currentUser;
  });
}

  isInWishlist(movieId: number): boolean {
  return this.firebaseService.wishlist.some(movie => movie.id === movieId);
  }



async toggleWishlist(movieId: number) {
  if (!this.currentUser) return;

  const inList = this.isInWishlist(movieId);

  if (inList) {
    this.firebaseService.removeFromWishlist(this.currentUser.id, movieId);
    this.firebaseService.wishlist = this.firebaseService.wishlist.filter(m => m.id !== movieId);
  } else {
    try {
      const movie = await firstValueFrom(this.movieService.getMovieById(movieId, this.movieService.language));
      this.firebaseService.addToWishlist(this.currentUser.id, movieId);
      this.firebaseService.wishlist.push(movie);
    } catch (err) {
      console.error('Error fetching movie:', err);
    }
  }
}


loadMovieDetails(movieId: number): void {
  this.languageService.language$.subscribe((newLang) => {
    this.language = newLang;

    this.movieService.getMovieById(movieId, newLang).subscribe(movie => {
      this.movie = movie;
    });

    this.movieService.getRecommendedMovies(movieId, newLang).subscribe(res => {
      this.recommendedMovies = res.results;
    });
  });

  this.movieService.getMovieVideos(movieId).subscribe(res => {
    const trailer = res.results.find(
      (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    if (trailer) {
      this.trailerKey = trailer.key;
      const url = `https://www.youtube.com/embed/${this.trailerKey}`;
      this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  });
}


}

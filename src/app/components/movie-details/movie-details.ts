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


  constructor(private route: ActivatedRoute,
              private movieService: Movies,
              private sanitizer: DomSanitizer,
              private firebaseService: Firebase) {}

  ngOnInit(): void {
    const movieId = +this.route.snapshot.paramMap.get('id')!;

    // Get movie details
    this.movieService.getMovieById(movieId).subscribe(movie => {
      this.movie = movie;
    });

    // Get videos and extract trailer
    this.movieService.getMovieVideos(movieId).subscribe(res => {
      const trailer = res.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        this.trailerKey = trailer.key;
      }
    });
    this.movieService.getRecommendedMovies(movieId).subscribe(res => {
        this.recommendedMovies = res.results;
    });
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
      const movie = await firstValueFrom(this.movieService.getMovieById(movieId));
      this.firebaseService.addToWishlist(this.currentUser.id, movieId);
      this.firebaseService.wishlist.push(movie);
    } catch (err) {
      console.error('Error fetching movie:', err);
    }
  }
}

}

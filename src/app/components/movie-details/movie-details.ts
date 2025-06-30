import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Movies } from '../../services/movies';
import { MovieItem } from '../../Models/movie-item';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private movieService: Movies) {}

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

  }
}

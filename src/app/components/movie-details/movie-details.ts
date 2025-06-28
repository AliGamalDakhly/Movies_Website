// import { Component, OnInit } from '@angular/core';
// import { MovieService } from '../../movie';
// import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-movie-details',
//   templateUrl: './movie-details.html',
//   styleUrls: ['./movie-details.css']
// })
// export class MovieDetailsComponent implements OnInit {
//   movie$: Observable<any>; // بتستخدم Observable للبيانات
//   recommendations$: Observable<any[]>;

//   constructor(private movieService: MovieService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     // احصل على ID من الـ Route (لو فيه)
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.movie$ = this.movieService.getMovieDetails(id);
//       this.recommendations$ = this.movieService.getRecommendations();
//     }
//   }
// getStarRating(rating: number): string {
//   const fullStars = Math.floor(rating);
//   const emptyStars = 5 - fullStars;
//   return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
// }
// }
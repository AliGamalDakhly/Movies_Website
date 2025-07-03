import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItem } from '../../Models/movie-item';
import { Firebase } from '../../services/firebase';
import { Movies } from '../../services/movies';
import { User } from '../../Models/user';
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

type StarType = 'full' | 'half' | 'empty';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist implements OnInit{

  tempwish: MovieItem[] = [];
  currentUser: User| null = null;
  loading: boolean = true;

  constructor(private movieService: Movies,private languageService: Language)
  {

  }
    
  firebaseService = inject(Firebase);

 async ngOnInit() {
  this.loading = true;

  await this.firebaseService.Init(); 
  this.currentUser = this.firebaseService.currentUser;

  this.languageService.language$.subscribe((newLang) => {
    this.updateWishlistByLanguage(newLang);
  });

  this.loading = false;
}




updateWishlistByLanguage(lang: string) {
  this.tempwish = [];

  if (this.currentUser) {
    for (const movieId of this.currentUser.Wishlist) {
      this.movieService.getMovieById(movieId, lang).subscribe(movie => {
        movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        this.tempwish.push(movie);
      });
    }
  }
}




  getStarsFromRating(rating: number): StarType[] 
  {
    const stars: StarType[] = [];

    const fullStars = Math.round(rating / 2); // Convert to 5-star scale
    const emptyStars = 5 - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty');
    }

    return stars;
  }

  removeFromWishlist(movieId: number)
  {
    this.tempwish = this.tempwish.filter(movie => {
      return movie.id != movieId;
    })

    if(this.currentUser != null)
    {
      this.firebaseService.removeFromWishlist(this.currentUser.id, movieId);
    }
      
  }


}

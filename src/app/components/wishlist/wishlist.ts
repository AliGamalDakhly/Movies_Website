import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItem } from '../../Models/movie-item';
import { Firebase } from '../../services/firebase';
import { Movies } from '../../services/movies';
import { User } from '../../Models/user';

type StarType = 'full' | 'half' | 'empty';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {

  tempwish: MovieItem[] = [];
  currentUser: User| null = null;
  loading: boolean = true;

  constructor(private firebaseService: Firebase,private movieService: Movies)
  {

  }
    
  async ngOnInit() 
  {
      this.loading = true;
      await this.firebaseService.Init(); 
      this.tempwish = this.firebaseService.wishlist;
      this.currentUser = this.firebaseService.currentUser;
      this.loading = false;
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

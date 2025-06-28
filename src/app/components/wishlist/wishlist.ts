import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItem } from '../../Models/movie-item';
import { Firebase } from '../../services/firebase';
import { Movies } from '../../services/movies';
import { User } from '../../Models/user';
import { firstValueFrom } from 'rxjs';

type StarType = 'full' | 'half' | 'empty';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist implements OnInit {

    tempwish: MovieItem[] = [];
    currentUser: User| null = null;

    constructor(private firebaseService: Firebase,private movieService: Movies){
      
    }
    
    async ngOnInit() 
    {
      console.log('oninit func');
      this.currentUser = await this.firebaseService.getUserByName('Ali');
      console.log('User loaded:', this.currentUser);

      if (this.currentUser) 
      {
          console.log(this.currentUser.UserName);
          for(let movieId of this.currentUser.Wishlist)
          {
            try {
              const movie = await firstValueFrom(this.movieService.getMovieById(movieId));
              movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              this.tempwish.push(movie);
            } catch (error) {
              console.error('Failed to load movie', error);
            }
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



  // we have to get the logged user
  // then we get movies he added to wishlist (from movie service , filter the movies)
  // then we display them in the page

  // foreach(let id in user.wishlist){
  //   let movie: Imovie =  Movies.find(id);
  //   wishlist.push(movie);
  // }

  

}

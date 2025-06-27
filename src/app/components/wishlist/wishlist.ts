import { Component } from '@angular/core';
import { Imovie } from '../../interfaces/imovie';
import { CommonModule } from '@angular/common';

type StarType = 'full' | 'half' | 'empty';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {

   wishlist: Imovie[] = [
  {
    id : 1,
    adult: true,
    title: 'Movie',
    genre_ids: [1,2],
    original_language: 'en',
    original_title: 'movie',
    overview: 'dfbvdf brberdg gtrh ',
    poster_path: 'csdvdsf',
    release_date: '15/5/199',
    vote_average: 3.5
      },
    {
    id : 3,
    adult: true,
    title: 'Movie',
    genre_ids: [1,2],
    original_language: 'en',
    original_title: 'movie',
    overview: 'dfbvdf brberdg gtrh ',
    poster_path: 'csdvdsf',
    release_date: '15/5/199',
    vote_average: 3.5
      },
    {
    id : 2,
    adult: true,
    title: 'Movie',
    genre_ids: [1,2],
    original_language: 'en',
    original_title: 'movie',
    overview: 'dfbvdf brberdg gtrh ',
    poster_path: 'csdvdsf',
    release_date: '15/5/199',
    vote_average: 3.5
      }
    ];


    

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
  this.wishlist = this.wishlist.filter(movie => {
    return movie.id != movieId;
  })
}

  // we have to get the logged user
  // then we get movies he added to wishlist (from movie service , filter the movies)
  // then we display them in the page

  // foreach(let id in user.wishlist){
  //   let movie: Imovie =  Movies.find(id);
  //   wishlist.push(movie);
  // }

  

}

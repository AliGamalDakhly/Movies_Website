import { Component, inject, OnInit } from '@angular/core';
import { Movies } from '../../services/movies';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MovieItem } from '../../Models/movie-item';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchBar } from '../search-bar/search-bar';
import { Firebase } from '../../services/firebase';
import { User } from '../../Models/user';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  imports: [SearchBar,CommonModule, MatButtonModule, MatCardModule,MatPaginatorModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard implements OnInit {
  currrentPage:number = 1;
  totlaPages:number = 0;
  displayedMovies: MovieItem[] = [];
  currentUser: User| null = null;

  constructor(private firebaseService: Firebase){}

  data = inject(Movies);
  
  async ngOnInit() {
    this.data.getMoviesByPage(1);
    /* Added By : Ali Gamal */
    await this.firebaseService.Init();
    this.currentUser = this.firebaseService.currentUser;
    /* End Of Code */
  }

  pageEvent(page:any){
    console.log(page);
    this.currrentPage = page.pageIndex + 1;
    this.data.getMoviesByPage(this.currrentPage);
    this.totlaPages = page.length;
    this.displayedMovies = this.data.moviesSignal();
  }


  /* code to add and remove from wish list : Ali Gamal */

  async ToggleToWishlist(movieId: number)
  {
    if(this.currentUser != null)
    {
      const inList = this.isInWishlist(movieId);

      if (inList) {
        this.firebaseService.removeFromWishlist(this.currentUser.id , movieId);
      } 


      else 
      {
        this.firebaseService.addToWishlist(this.currentUser.id , movieId);

        let movie: MovieItem | null = null;
        try 
        {
          movie = await firstValueFrom(this.data.getMovieById(movieId));
          this.firebaseService.wishlist.push(movie);
        } 
        catch (error) {
          console.error('Failed to fetch movie:', error);
        }
        // this.firebaseService.wishlist.push(movie);
      }
    }
  }


  isInWishlist(movieId: number): boolean {
    return this.firebaseService.wishlist.some(movie => movie.id === movieId);
  }

  /* End Of Added Code */

}

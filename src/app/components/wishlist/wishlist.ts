import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItem } from '../../Models/movie-item';
import { Firebase } from '../../services/firebase';
import { Movies } from '../../services/movies';
import { User } from '../../Models/user';
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language';

type StarType = 'full' | 'half' | 'empty';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist{

  tempwish: MovieItem[] = [];
  currentUser: User| null = null;
  loading: boolean = true;

  constructor(private firebaseService: Firebase,private movieService: Movies,private languageService: Language)
  {

  }
    
 async ngOnInit() {
  this.loading = true;

  await this.firebaseService.Init(); 
  this.currentUser = this.firebaseService.currentUser;

  // أول مرة تحمل القائمة باللغة الحالية
  this.updateWishlistByLanguage(this.languageService.currentLanguage);

  // اشتراك على أي تغيير في اللغة
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

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.tempwish = [];

  //   if(this.currentUser)
  //   this.currentUser.Wishlist.forEach(element => {
  //      this.movieService.getMovieById(element, this.languageService.currentLanguage).subscribe(
  //       movie => {
  //       this.tempwish.push(movie); // 👉 هنا بنضيف الفيلم للـ tempwish
  //     }
  //      )
  //   });
    
  // }


   

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

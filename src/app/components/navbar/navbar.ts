import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Movies } from '../../services/movies';
import { Language } from '../../services/language';
import { Firebase } from '../../services/firebase';



@Component({
  selector: 'app-navbar',
  imports: [FormsModule,CommonModule,TranslateModule,RouterLink],

  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar{

  constructor(private languageService: Language ) {}
  
  language = 'en';
  languages = ['en', 'ar', 'fr', 'zh'];
  isDarkMode = false;
  movieByLanguage = inject(Movies);
  firebaseService = inject(Firebase);

  onChange(){
    this.languageService.setLanguage(this.language);
    console.log(`Language changed to: ${this.language}`);
    this.movieByLanguage.getMoviesByPage(this.movieByLanguage.pageNumber,this.language);
    document.body.removeAttribute('dir');
  }
  username: string | null = null;
  menuOpen = false;

  
applyDirection(lang: string) {
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', direction);
  }
  

  ngOnInit(): void {

    this.language = this.languageService.currentLanguage;
    

    const savedLang = sessionStorage.getItem('lang');
  
    if (savedLang) {
      this.language = savedLang;
      this.movieByLanguage.language = savedLang;
      this.applyDirection(savedLang);
    }

    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }

}
    
    //this.wishlistCount = this.firebaseService.wishlist.length;

  

   changeLanguage() {
    sessionStorage.setItem("lang", JSON.stringify(this.movieByLanguage.language) )
    this.languageService.setLanguage(this.language);
  }



  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    sessionStorage.setItem('theme', isDark ? 'light': 'dark' );
  }

  
  logout() {
    sessionStorage.removeItem('userEmail');
    this.username = null;
    window.location.href = '/'; 
  }

 


}

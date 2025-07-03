import { CommonModule } from '@angular/common';
import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
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
export class Navbar {

  constructor(private languageService: Language, private router: Router ) {}
  
  language = 'en';
  languages = ['en', 'ar'];
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
  

    ngOnInit(): void {

        this.language = this.languageService.currentLanguage;
        const savedLang = sessionStorage.getItem('lang');
      
        if (savedLang) {
          this.language = savedLang;
          this.movieByLanguage.language = savedLang;
        }

        const savedTheme = sessionStorage.getItem('theme');
        this.isDarkMode = savedTheme === 'dark';

        if (this.isDarkMode) {
          document.body.classList.add('dark-mode');
        }
        
    }
    

   changeLanguage() {
      sessionStorage.setItem("lang", JSON.stringify(this.movieByLanguage.language) )
      this.languageService.setLanguage(this.language);
    }



  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      sessionStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      sessionStorage.setItem('theme', 'light');
    }
  }

  
  logout() {
    sessionStorage.removeItem('userEmail');
    this.username = null;
    this.router.navigate(['/login']); // Navigate to login component
  }

 


}

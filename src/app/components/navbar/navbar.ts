import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Movies } from '../../services/movies';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar{

  language = 'en';
  languages = ['en', 'ar', 'fr', 'zh'];
  isDarkMode = false;
  movieByLanguage = inject(Movies);

  onChange(){
    console.log(`Language changed to: ${this.language}`);
    this.movieByLanguage.getMoviesByPage(this.movieByLanguage.pageNumber,this.language);
  }

  
}


















  // username: string | null = null;

  // ngOnInit(): void {
  //   console.log(this.language);
    
  //   }
  
  //   const savedTheme = localStorage.getItem('theme');
  //   if (savedTheme === 'dark') {
  //     document.body.classList.add('dark-mode');
  //   }

  //   this.username = localStorage.getItem('username');
  // }

  // changeLanguage() {
  //   localStorage.setItem('lang', this.language);
  //   this.applyDirection(this.language);
  // }

  // applyDirection(lang: string) {
  //   const direction = lang === 'ar' ? 'rtl' : 'ltr';
  //   document.body.setAttribute('dir', direction);
  // }

  // toggleDarkMode() {
  //   const isDark = document.body.classList.toggle('dark-mode');
  //   localStorage.setItem('theme', isDark ? 'dark' : 'light');
  // }

  // logout() {
  //   localStorage.removeItem('username');
  //   this.username = null;
  // }

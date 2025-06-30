import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [FormsModule,CommonModule,TranslateModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {

   language = 'en';
  languages = ['en', 'ar', 'fr', 'zh'];
  username: string | null = null;
  menuOpen = false;
  
  constructor(private languageService: Language) {}

  ngOnInit(): void {

    this.username = localStorage.getItem('username');

    this.language = this.languageService.currentLanguage;
    

    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.language = savedLang;
      this.applyDirection(savedLang);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    
    //this.wishlistCount = this.firebaseService.wishlist.length;

    }

   changeLanguage() {
    this.languageService.setLanguage(this.language);
  }

  applyDirection(lang: string) {
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', direction);
  }

  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'light': 'dark' );
  }

  
  logout() {
    localStorage.removeItem('username');
    this.username = null;
    window.location.href = '/'; 
  }

 
}














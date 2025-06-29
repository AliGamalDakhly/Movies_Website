import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule,CommonModule,TranslateModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {

  language = 'en';
  languages = ['en', 'ar', 'fr', 'zh'];
  username: string | null = null;
  menuOpen = false;

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.language = savedLang;
      this.applyDirection(savedLang);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    this.username = localStorage.getItem('username');
  }

  changeLanguage() {
    localStorage.setItem('lang', this.language);
    this.applyDirection(this.language);
  }

  applyDirection(lang: string) {
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', direction);
  }

  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // logout() {
  //   localStorage.removeItem('username');
  //   this.username = null;
  // }

  logout() {
  localStorage.removeItem('username');
  this.username = null;
  window.location.href = '/'; 
}
}

import { Component, OnInit } from '@angular/core';
import { Language } from '../../services/language';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer implements OnInit {
language = 'en';
 constructor(private languageService: Language) {}
ngOnInit(): void {
     this.languageService.language$.subscribe(lang => {
      this.language = lang;
      
      document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    });
  }
  

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Language {

   private langSubject = new BehaviorSubject<string>(localStorage.getItem('lang') || 'en');
  language$ = this.langSubject.asObservable(); 

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.langSubject.next(lang); 
  }

  get currentLanguage(): string {
    return this.langSubject.value;
  }
}

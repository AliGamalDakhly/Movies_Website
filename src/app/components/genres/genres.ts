// src/app/components/genres/genres.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GenresService } from '../../services/genres';
import { Language } from '../../services/language';


@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './genres.html',
  styleUrls: ['./genres.css']
})
export class GenresComponent implements OnInit {
  private srv = inject(GenresService);
  private language = inject(Language);
  genres     = this.srv.genres;
  moviesMap  = this.srv.moviesByGenre;

 
  selectedGenreId = signal<number|null>(null);

  ngOnInit() {
    if (!this.genres().length) this.srv.loadGenres();
  }

 
  toggle(id: number) {
    
    if (this.selectedGenreId() === id) {
      this.selectedGenreId.set(null);
    } else {
      this.selectedGenreId.set(id);
      this.srv.loadMoviesFor(id);     
    }
  }
}


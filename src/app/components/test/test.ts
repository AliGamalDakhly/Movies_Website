import { Component } from '@angular/core';
import { Firebase } from '../../services/firebase';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  imports: [CommonModule],
  templateUrl: './test.html',
  styleUrl: './test.css'
})
export class Test {
  movies: any[] = [];

  constructor(private firebaseService: Firebase) {
    this.firebaseService.getMovies().subscribe(data => this.movies = data);
  }
}

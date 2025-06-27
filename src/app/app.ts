import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test } from './components/test/test';
import { SearchBar } from './components/search-bar/search-bar';
import { MovieCard } from "./components/movie-card/movie-card";




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Test, MovieCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Movies_Website';
}

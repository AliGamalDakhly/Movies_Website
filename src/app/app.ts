import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test } from './components/test/test';
import { SearchBar } from './components/search-bar/search-bar';
import { MovieCard } from "./components/movie-card/movie-card";

import { Wishlist } from './components/wishlist/wishlist';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core'; 



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Test,Navbar,Footer,FormsModule,CommonModule,TranslateModule, Wishlist, MovieCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Movies_Website';
}

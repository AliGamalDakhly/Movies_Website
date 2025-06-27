import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test } from './components/test/test';
import { Wishlist } from './components/wishlist/wishlist';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Test, Wishlist],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Movies_Website';
}

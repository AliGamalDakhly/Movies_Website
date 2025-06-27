import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test } from './components/test/test';
import { Wishlist } from './components/wishlist/wishlist';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core'; 



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Test,Navbar,Footer,FormsModule,CommonModule,TranslateModule, Wishlist],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Movies_Website';
}

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Test } from './components/test/test';
import { Login } from './components/login/login';
import { Register } from './components/register/register';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, Test ,Login,Register],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Movies_Website';
}

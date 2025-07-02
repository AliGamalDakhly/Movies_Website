
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Navbar } from './components/navbar/navbar';
import { MovieCard } from './components/movie-card/movie-card';
import { Wishlist } from './components/wishlist/wishlist';
import { MovieDetails } from './components/movie-details/movie-details';
import { PageNotFound } from './components/page-not-found/page-not-found';


export const routes: Routes = [
    //  { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '', component: MovieCard },
      { path: 'moviecard', component: MovieCard },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'wishlist', component: Wishlist },
      { path: 'movie/:id', component: MovieDetails },
      { path: '**', component: PageNotFound }

];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

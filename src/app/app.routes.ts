
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { MovieCard } from './components/movie-card/movie-card';
import { Wishlist } from './components/wishlist/wishlist';
// import { MovieDetailsComponent } from '../app/components/movie-details/movie-details';


export const routes: Routes = [
    //  { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '', component: MovieCard },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'wishlist', component: Wishlist },
  // { path: 'movie/:id', component: MovieDetailsComponent },
  // { path: '', redirectTo: 'movie/1', pathMatch: 'full' } // مؤقتًا



];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

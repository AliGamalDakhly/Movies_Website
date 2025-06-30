
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Navbar } from './components/navbar/navbar';
// import { MovieDetailsComponent } from '../app/components/movie-details/movie-details';


export const routes: Routes = [
      
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'navbar', component: Navbar },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: '**', redirectTo: '/login' }

  // { path: 'movie/:id', component: MovieDetailsComponent },
  // { path: '', redirectTo: 'movie/1', pathMatch: 'full' } // مؤقتًا



];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

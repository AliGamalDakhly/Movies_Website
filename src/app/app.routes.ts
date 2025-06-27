//import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { MovieDetailsComponent } from '../app/components/movie-details/movie-details';

export const routes: Routes = [
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: '', redirectTo: 'movie/1', pathMatch: 'full' } // مؤقتًا
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
export class AppRoutingModule { }

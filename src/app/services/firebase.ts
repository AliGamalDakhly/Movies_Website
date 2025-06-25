import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Firebase {
  constructor(private firestore: Firestore) {}

  addMovie(movie: any) {
    const moviesRef = collection(this.firestore, 'movies');
    return addDoc(moviesRef, movie);
  }

  getMovies(): Observable<any[]> {
    const moviesRef = collection(this.firestore, 'movies');
    return collectionData(moviesRef, { idField: 'id' });
  }
}

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, DocumentData } from '@angular/fire/firestore';
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

    async getMovieById(id: string): Promise<any | null> {
    const docRef = doc(this.firestore, 'movies', id);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  }
}

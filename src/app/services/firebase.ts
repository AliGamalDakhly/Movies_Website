import { Injectable, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, DocumentData, query, where, getDocs, updateDoc, arrayRemove } from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../Models/user';
import { MovieItem } from '../Models/movie-item';
import { Movies } from './movies';

@Injectable({
  providedIn: 'root'
})
export class Firebase {

  // assume we have a user and he is logged in / assume his username : Ali
  isLogged: boolean = true;
  currentUser : User | null = null; 
  wishlist: MovieItem[] =[];

  constructor(private firestore: Firestore , private movieService: Movies ) 
  {}


  // on init => i load all movies in the wishlist of the user. they are available for each one use the service.
  async Init() 
  {
    this.currentUser = await this.getUserByName('Ali');

    if (this.currentUser) 
    {
        for(let movieId of this.currentUser.Wishlist)
        {
          try {
            const movie = await firstValueFrom(this.movieService.getMovieById(movieId));
            movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            this.wishlist.push(movie);
          } catch (error) {
            console.error('Failed to load movie', error);
          }
        }
    }
  }


 
  async getUserByName(username: string): Promise<User | null> {
    const q = query(collection(this.firestore, 'Users'), where('UserName', '==', username));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return {
        id: docSnap.id,                 // ✅ Inject Firestore doc ID
        ...(docSnap.data() as Omit<User, 'id'>)  // ✅ Spread the rest of the user data
      } as User;
    }

    return null;
  }


async removeFromWishlist(username: string, movieId: number) {
  const userDocRef = doc(this.firestore, 'Users', username);

  try {
    await updateDoc(userDocRef, {
      Wishlist: arrayRemove(movieId)
    });
    console.log(`Movie ${movieId} removed from ${username}'s wishlist.`);
  } catch (error) {
    console.error('Error removing movie from wishlist:', error);
  }
}


}

import { Injectable, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, DocumentData, query, where, getDocs, updateDoc, arrayRemove, arrayUnion } from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { MovieItem } from '../Models/movie-item';
import { Movies } from './movies';
import { Language } from './language';
import { setDoc } from '@angular/fire/firestore';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class Firebase {

  // assume we have a user and he is logged in / assume his username : Ali
  currentUser : User | null = null; 
  wishlist: MovieItem[] =[];

  constructor(private firestore: Firestore , private movieService: Movies, private langService: Language ) 
  {}


  // on init => i load all movies in the wishlist of the user. they are available for each one use the service.
  async Init() 
  {
    let loggedEmail: string | null = sessionStorage.getItem("userEmail");
    this.wishlist = [];

    if(loggedEmail != null)
      this.currentUser = await this.getUserByEmail(loggedEmail);

    if (this.currentUser) 
    {
        for(let movieId of this.currentUser.Wishlist)
        {
          try {
            const movie = await firstValueFrom(this.movieService.getMovieById(movieId, this.langService.currentLanguage));
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

  async getUserByEmail(email: string): Promise<User | null> {
    const q = query(collection(this.firestore, 'Users'), where('Email', '==', email));
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


  async addToWishlist(username: string, movieId: number): Promise<void> {
    const userDocRef = doc(this.firestore, 'Users', username);

    try {
      await updateDoc(userDocRef, {
        Wishlist: arrayUnion(movieId)
      });
      console.log(`Movie ${movieId} added to ${username}'s wishlist.`);
    } catch (error) {
      console.error('Error adding movie to wishlist:', error);
    }
  }

  async removeFromWishlist(username: string, movieId: number) {

    this.wishlist = this.wishlist.filter(movie => movie.id != movieId);
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


  

  async createUserInFirestore(userId: string, user: Omit<User, 'id'>): Promise<void> {
    const userDocRef = doc(this.firestore, 'Users', userId); // Set Firestore doc ID = UID
    await setDoc(userDocRef, user);
  }
}

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, DocumentData, query, where, getDocs, updateDoc, arrayRemove } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class Firebase {
  constructor(private firestore: Firestore) {}


 
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

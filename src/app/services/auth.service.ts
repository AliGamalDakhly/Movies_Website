import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { User } from '../Models/user';
import { Firebase } from './firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private auth: Auth, private firebaseService: Firebase) { }



  register(email: string, password: string, firstName: string, lastName: string): Observable<any> {
  return from(
    createUserWithEmailAndPassword(this.auth, email, password).then(async (userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      const newUser: Omit<User, 'id'> = {
        FirstName: `${firstName}`,
        LastName: `${lastName}`,
        Email: email,
        Wishlist: []
      };

      await this.firebaseService.createUserInFirestore(uid, newUser);

      return userCredential;
    })
  );
}

  // Register new user
  // register(email: string, password: string, firstName: string, lastName: string): Observable<any> {
  //   return from(
  //     createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
  //       // Update user profile with first and last name
  //       return updateProfile(userCredential.user, {
  //         displayName: `${firstName} ${lastName}`
  //       }).then(() => {
  //         return userCredential;
  //       });
  //     })
  //   );
  // }

  // Login user
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Logout user
  logout(): Observable<any> {
    return from(signOut(this.auth));
  }

  // Get current user
  // getCurrentUser(): User | null {
  //   return this.auth.currentUser;
  // }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }
}


import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  userDataSubject$ = new BehaviorSubject<User>(null);

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.userDataSubject$.next(user);
      } else {
        localStorage.setItem('user', null);
        this.userDataSubject$.next(null);
      }
    });
  }

  // METHOD TO LOG IN USING GOOGLE ACCOUNT
  loginWithGoogle(): Promise<void> {
    const googleProvider = new auth.GoogleAuthProvider;
    return this.authLogin(googleProvider)
      .then((response) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response));
        }
      })
      .catch((err) => console.log(err));
  }

  //LOGIN WITH CREDENTIALS (Email and Password)
  loginWithCredientials(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          if (response) {
            localStorage.setItem('user', JSON.stringify(response));
            resolve(response as any);
          }
        })
        .catch((err) => reject(err));
    });
  }

  //REGISTER WITH Email and Password
  singUpWithCredentials(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          if (response) {
            localStorage.setItem('user', JSON.stringify(response));
            resolve(response as any);
          }
        })
        .catch((err) => reject(err));
    });
  }

  //GET CURRENT USER
  getCurrentUser(): Observable<User> {
    return this.afAuth.authState;
  }

  //LOGOUT
  logOut(): Promise<void> {
    return this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
      })
      .catch((err) => console.log(err));
  }

  isAuthenticated(): boolean {
    const user: User = JSON.parse(localStorage.getItem('user')) ?? null;
    return user !== null;
  }

  private authLogin(provider: auth.GoogleAuthProvider): Promise<auth.UserCredential> {
    return this.afAuth.signInWithPopup(provider);
  }
}

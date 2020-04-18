import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from  "@angular/fire/auth";
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AppUser } from './user.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<AppUser>;
  user: User;

  constructor( public  router:  Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore ) {
      // Subscribing to the authState will update any time the authState changes.
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.user = user;
          this.setUser();
        }
      })
    }

  // Logs a user in and navigates to the home page on success.
  async login(email: string, password: string) {
    auth().signInWithEmailAndPassword(email, password).then(result => {
      if (result.user.emailVerified) {
        this.router.navigate(['homepage']);
        this.user = result.user;
        this.setUser();
      } else
        this.logout();
      }).catch(error => {
        window.alert(error.message);
    })
  }

  // Logs out user and navigates to login page on success.
  async logout() {
    await auth().signOut();
    this.router.navigate(['login']);
  }

  // Sends an email verification to the current user.
  async sendEmailVerification() {
    return auth().currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Creates a new user with an input email and password.
  async register(email, password, first, last, username) {
    return auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.sendEmailVerification();
        this.createUser(result.user.uid, first, last, username, email);
      }).catch(error => {
        window.alert(error.message);
      })
  }
  
  // Routes to the login page after the password reset email has been sent.
  async sendPasswordResetEmail(passwordResetEmail: string) {
    auth().sendPasswordResetEmail(passwordResetEmail).then(result => {
      this.router.navigate(['login']);
    }).catch(error => {
      window.alert(error.message);
    })
  }

  async createUser(id, first, last, username, email) {
    let appUser = new AppUser(id, first, last, username, email)
    let appUserRef = this.afs.collection<AppUser>('users');
    appUserRef.doc(id).set(JSON.parse(JSON.stringify(appUser)));
  }

  async setUser() {
    if (this.user) {
      let appUserRef = this.afs.collection<AppUser>('users', ref => ref.where('id', '==', this.user.uid));
      this.user$ = appUserRef.snapshotChanges().pipe(map(actions => {
        let data = actions.pop();
        return data.payload.doc.data();
      }))
    }
  }
}

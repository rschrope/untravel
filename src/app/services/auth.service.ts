import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from  "@angular/fire/auth";
import { auth } from 'firebase/app';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public  router:  Router, private afAuth: AngularFireAuth ) {
      // Subscribing to the authState will update any time the authState changes.
      this.afAuth.authState.subscribe(user => {
        if (user)
          this.user = user;
      })
    }

  // Logs a user in and navigates to the home page on success.
  async login(email: string, password: string) {
    auth().signInWithEmailAndPassword(email, password).then(result => {
        if (this.user.emailVerified)
          this.router.navigate(['homepage']);
        else if (this.user)
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
  async register(email, password) {
    return auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.sendEmailVerification();
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
}

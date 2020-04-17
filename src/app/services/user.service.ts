import { Injectable } from '@angular/core';
import { AuthService } from  '../services/auth.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

export class AppUser {
  id: string;
  first: string;
  last: string;
  username: string;
  email: string;

  constructor(id, first, last, username, email) {
    this.id = id;
    this.first = first;
    this.last = last;
    this.username = username;
    this.email = email;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private afs: AngularFirestore, private authService: AuthService ) { }

  async createUser(first, last, username, email) {
    console.log("creating user")
    let user = await this.authService.user;
    let appUser = new AppUser(user.uid, first, last, username, email)
    let appUserRef = this.afs.collection<AppUser>('users');
    appUserRef.doc(user.uid).set(JSON.parse(JSON.stringify(appUser)));
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  user$: Observable<AppUser>;

  constructor( private afs: AngularFirestore ) { }

}

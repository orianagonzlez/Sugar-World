import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileCollection: AngularFirestoreCollection<Profile>;

  constructor(private db: AngularFirestore) {
    this.profileCollection = this.db.collection<Profile>('profiles');
  }

  getAllProfiles(): Observable<DocumentChangeAction<Profile>[]> {
    return this.profileCollection.snapshotChanges();
  }

  getProfile(userId: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return this.profileCollection.ref.where('userId', '==', userId).get();
  }

  createProfile(newProfile: Profile): Promise<any> {
    return this.profileCollection.add(newProfile);
  }

  updateProfile(data: Profile, docId: string): Promise<void> {
    return this.profileCollection.doc<Profile>(docId).update(data);
  }
}

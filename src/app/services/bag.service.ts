import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot, Action } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Bag } from '../models/bag';
import { CartProduct } from '../models/cart-product';

@Injectable({
  providedIn: 'root'
})
export class BagService {
  private bagCollection: AngularFirestoreCollection<Bag>

  openBag: string 

  constructor(private db: AngularFirestore) {
     this.bagCollection = this.db.collection<Bag>('bags')
   }

   getBag(bagId: string): Observable<Action<DocumentSnapshot<Bag>>> {
    return this.bagCollection.doc<Bag>(bagId).snapshotChanges();
  }

   getUserBags(userId: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
     return this.bagCollection.ref.where('userId', '==', userId).where('isInCart', '==', true).get();
   }

   getCurrentBag(userId: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
     return this.bagCollection.ref.where('userId', '==', userId).where('open', '==', true).get();
   }

   createBag(bag: Bag):Promise<any>{
    return this.bagCollection.add(bag);
  }

   updateBag(docId: string, data: Bag): Promise<void> {
    return this.bagCollection.doc<Bag>(docId).update(data);
  }

   deleteBag(docId: string): Promise<void> {
    return this.bagCollection.doc<Bag>(docId).delete();
  }
  
}

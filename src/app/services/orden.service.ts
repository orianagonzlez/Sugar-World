import { Injectable } from '@angular/core';
import { Action, AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private ordenCollection: AngularFirestoreCollection<Orden>;

  constructor(private db: AngularFirestore) { 
    this.ordenCollection = this.db.collection<Orden>('ordenes');
  }

  getAllOrders(): Observable<DocumentChangeAction<Orden>[]> {
    return this.ordenCollection.snapshotChanges();
  }

  getOrder(orderId: string): Observable<Action<DocumentSnapshot<Orden>>> {
    return this.ordenCollection.doc<Orden>(orderId).snapshotChanges();
  }

  createOrder(newOrder: Orden): Promise<any> {
    return this.ordenCollection.add(newOrder);
  }
    // @param data
    // @param docId
  
  updateOrder(data: Orden, docId: string): Promise<void>{
    return this.ordenCollection.doc<Orden>(docId).update(data);
  }
    // @param docId
  
  deleteOrder(docId: string): Promise<void>{
    return this.ordenCollection.doc<Orden>(docId).delete();
  }


getUserOrders(userId: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return this.ordenCollection.ref.where('userId', '==', userId).get();
  }
}

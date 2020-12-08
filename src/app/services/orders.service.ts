import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order   } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orderCollection: AngularFirestoreCollection<Order>;

  constructor(private db: AngularFirestore) { 
    this.orderCollection = this.db.collection<Order>('orders');
  }

  getAllOrders(): Observable<DocumentChangeAction<Order>[]> {
    return this.orderCollection.snapshotChanges();
  }

  getOrder(orderId: string): Observable<Action<DocumentSnapshot<Order>>> {
    return this.orderCollection.doc<Order>(orderId).snapshotChanges();
  }

  createOrder(newOrder: Order): Promise<any> {
    return this.orderCollection.add(newOrder);
  }
    // @param data
    // @param docId
  
  updateOrder(data: Order, docId: string): Promise<void>{
    return this.orderCollection.doc<Order>(docId).update(data);
  }
    // @param docId
  
  deleteOrder(docId: string): Promise<void>{
    return this.orderCollection.doc<Order>(docId).delete();
  }
}

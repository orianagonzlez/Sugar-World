import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/Shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

   private productCollection: AngularFirestoreCollection<ShoppingCart>;

  constructor(private db: AngularFirestore) { 
     this.productCollection = this.db.collection<ShoppingCart>('shoppingCart');
  }



}

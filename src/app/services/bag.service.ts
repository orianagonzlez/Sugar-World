import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { firestore } from 'firebase';
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

   addBag(userId: string, price: number, product: CartProduct){
    console.log(this.openBag+" la bolsa abierta es ")

    if (this.openBag==null ){
      let newBag = {
        price: price,
        products: [product],
        userId: userId,
        weight: product.quantify
      }
        
     return this.createBag(newBag);
    }
    else{
      return this.addToOpenBag(product)
    }
   }

   createBag(bag: Bag):Promise<any>{
     return this.bagCollection.add(bag).then((res) =>{
      this.openBag=res.id;
      console.log("soy la bolsa abierta: "+this.openBag);
     })
   }

   addToOpenBag(product: CartProduct):Promise<any>{
      return this.bagCollection.doc(this.openBag).update({
        products: firebase.firestore.FieldValue.arrayUnion(product)
      })
   }

  
 




  
}

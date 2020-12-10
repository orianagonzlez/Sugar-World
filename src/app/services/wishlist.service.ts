import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
   private favoritesCollection: AngularFirestoreCollection<Favorite>;

  constructor(private db: AngularFirestore) {
    this.favoritesCollection = this.db.collection<Favorite>('favorites');
   }



  getWishList(
    userId: string
): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return this.favoritesCollection.ref.where('userId', '==', userId).get();
  }





  addToWishList(userId: string, productId: string): Promise<void> {
    return this.favoritesCollection.ref
      .where('userId', '==', userId)
      .get()
      .then((res) => {

        if (res.docs.length <= 0) {
          this.favoritesCollection
            .add({
              userId,
              favorites: [productId],
            })
            .then((res) => {
            });
        } else {
  
          let newFavorites = [...res.docs[0].get('favorites')];

          if (
            (res.docs[0].get('favorites') as Array<string>).includes(
              productId
            )
          ) {
            newFavorites = newFavorites.filter((item) => item !== productId);
          } else {
            newFavorites.push(productId);
          }

          const favDoc: Favorite = {
            id: res.docs[0].id,
            userId: res.docs[0].get('userId'),
            favorites: newFavorites,
          };

          this.favoritesCollection.doc<Favorite>(favDoc.id).update({
            userId: favDoc.userId,
            favorites: favDoc.favorites,
          });
        }
      });
  }
  }







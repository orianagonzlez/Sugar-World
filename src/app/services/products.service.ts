import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import {  finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private productCollection: AngularFirestoreCollection<Product>;
  private filePath: any;
  private url: Observable<string>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { 
    this.productCollection = this.db.collection<Product>('products');
  }

  getAllProducts(): Observable<DocumentChangeAction<Product>[]> {
    return this.productCollection.snapshotChanges();
  }

  getProduct(productId: string): Observable<Action<DocumentSnapshot<Product>>> {
    console.log(productId)
    return this.productCollection.doc<Product>(productId).snapshotChanges();
  }

  getProductsByCategory(categoryId: string): Promise<firestore.QuerySnapshot<firestore.DocumentData>> {
    return this.productCollection.ref.where('category', '==', categoryId).get();
  } 

  getProductsByPrice(min: number, max: number): Promise<firestore.QuerySnapshot<firestore.DocumentData>> {
    return this.productCollection.ref.where('price', '>=', min).where('price', '<=', max).get();
  } 

  /*getProductByName(name: string): Promise<firestore.QuerySnapshot<firestore.DocumentData>> {
    return this.productCollection.ref.where('name', 'in', name).get();
  } */

  /*createProduct(newProduct: Product): Promise<any> {
    return this.productCollection.add(newProduct);
  }*/

   createProduct(newProduct: Product, image: Image){
    this.filePath = `images/${newProduct.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const pro = this.storage.upload(this.filePath, image);
    pro.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(urlImage=>{
          newProduct.image=urlImage;
          console.log(newProduct.image);
          return this.productCollection.add(newProduct);
        })
      })
    ).subscribe();
  }

    // @param data
    // @param docId


    updateProduct(data: Product, docId: string, newImage?: Image): Promise<void>{
      if(newImage){
          this.filePath = `images/${data.name}`;
          const fileRef = this.storage.ref(this.filePath);
          const pro = this.storage.upload(this.filePath, newImage);
          pro.snapshotChanges()
          .pipe(
            finalize(()=>{
              fileRef.getDownloadURL().subscribe(urlImage=>{
                data.image=urlImage;
                return this.productCollection.doc<Product>(docId).update(data);
              })
            })
          ).subscribe();
      }
    return this.productCollection.doc<Product>(docId).update(data);
  }
  
  /*updateProduct(data: Product, docId: string): Promise<void>{
    return this.productCollection.doc<Product>(docId).update(data);
  }*/

    // @param docId
  
  deleteProduct(docId: string): Promise<void>{
    return this.productCollection.doc<Product>(docId).delete();

  }

  /*uploadImage(product: Product, image: Image, docId: string,  ){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const pro = this.storage.upload(this.filePath, image);
    pro.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(urlImage=>{
          this.url =urlImage;
          console.log(this.url);
          

        })
      })
    ).subscribe();

  }*/

  
}

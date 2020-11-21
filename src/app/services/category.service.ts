import { Injectable } from '@angular/core';
import { Action, AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesCollection: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) { 
    this.categoriesCollection = this.db.collection<Category>('categories');
  }

  getAllCategories(): Observable<DocumentChangeAction<Category>[]> {
    return this.categoriesCollection.snapshotChanges();
  }

  getCategory(categoryId: string): Observable<Action<DocumentSnapshot<Category>>> {
    console.log(categoryId);
    return this.categoriesCollection.doc<Category>(categoryId).snapshotChanges();
  }

  createCategory(newCategory: Category): Promise<any> {
    return this.categoriesCollection.add(newCategory);
  }

  updateCategory(data: Category, docId: string): Promise<void> {
    return this.categoriesCollection.doc<Category>(docId).update(data);
  }

  deleteCategory(docId: string): Promise<void> {
    return this.categoriesCollection.doc<Category>(docId).delete();
  }
}


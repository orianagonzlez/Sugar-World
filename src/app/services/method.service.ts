import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Method } from '../models/method';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {
  private methodCollection: AngularFirestoreCollection<Method>;

  constructor(private db: AngularFirestore) { 
    this.methodCollection = this.db.collection<Method>('methods');
  }

  getAllMethods(): Observable<DocumentChangeAction<Method>[]> {
    return this.methodCollection.snapshotChanges();
  }

  getMethod(methodId: string): Observable<Action<DocumentSnapshot<Method>>> {
    return this.methodCollection.doc<Method>(methodId).snapshotChanges();
  }

  createMethod(newMethod: Method): Promise<any> {
    return this.methodCollection.add(newMethod);
  }
    // @param data
    // @param docId
  
  updateMethod(data: Method, docId: string): Promise<void>{
    return this.methodCollection.doc<Method>(docId).update(data);
  }
    // @param docId
  
  deleteMethod(docId: string): Promise<void>{
    return this.methodCollection.doc<Method>(docId).delete();
  }
}

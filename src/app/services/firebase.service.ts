import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private db: Firestore;
  studentCol: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    initializeApp(environment.firebase);
    this.db = getFirestore();
    this.studentCol = collection(this.db, 'students');

    // Get Realtime Data
    onSnapshot(this.studentCol, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }

  async getStudents() {
    const snapshot = await getDocs(this.studentCol);
    return snapshot;
  }


  async addStudent(name: string, age: string) {
    // await addDoc(this.studentCol, {
    //   name,
    //   age
    // })
    // return;

    this.afAuth.authState.subscribe(user => {

      if (user) {
        let UID = user.uid;
        return this.firestore.collection('admin').doc(UID)                     // on a successful signup, create a document in 'users' collection with the new user's info
          .collection("userdata").doc('data').set({ name, age });

      }
      else {
        return ""
      }

    });
  }


  profileUpdate(user: any): boolean {
    this.afAuth.authState.subscribe(isUser => {
      if (isUser) {
        let UID = isUser.uid;
        this.firestore.collection('admin').doc(UID)                        // on a successful signup, create a document in 'users' collection with the new user's info
          .update({
            firstName: user.fname,
            lastName: user.lname
          });
        return true;
      }
      else {
        return false;
      }
    });
    return false;
  }



  async deleteStudent(docId: string) {
    const docRef = doc(this.db, 'students', docId)
    await deleteDoc(docRef);
    return;
  }

  async updateStudent(docId: string, name: string, age: string) {
    const docRef = doc(this.db, 'students', docId);
    await updateDoc(docRef, { name, age })
    return;
  }

}



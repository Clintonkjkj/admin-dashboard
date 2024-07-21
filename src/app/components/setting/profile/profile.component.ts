import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavService } from 'src/app/shared/service/nav.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isProgressVisible:boolean;
  user: Observable<any> | undefined;
  public edit: boolean = false;
  constructor(public afAuth: AngularFireAuth,
     private firebaseService: FirebaseService,
      private firestore: AngularFirestore, 
      public navServices: NavService,
      private fb: FormBuilder ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {   
      console.log("profile:",user)                                 // grab the user object from Firebase Authorization
      if (user && user.emailVerified) {
        let UID = user.uid;
        this.user = this.firestore.collection('admin').doc(UID).valueChanges();
        this.user.subscribe(data=>{
          this.profileForm =this.fb.group({
            'fname':[data.firstName, Validators.required],
            'lname':[data.lastName, Validators.required]
          });
        });
        
      }
      else {
     
      }
    });
  }

  update() {
    if (this.profileForm.invalid)                            // if there's an error in the form, don't submit it
    return;
  this.isProgressVisible = true;
  const result =this.firebaseService.profileUpdate(this.profileForm.value) 
    if (result == true)  
    {
      this.edit=true;
      this.isProgressVisible = false;
    }                                 
    else if (result == false) {
      this.edit=false;
      this.isProgressVisible = false;
        
  }
  }

  cancel() {
    this.edit = false;
  }

  toggleEdit() {
    this.edit = true;
  }

  resetEdit() {

  }
}

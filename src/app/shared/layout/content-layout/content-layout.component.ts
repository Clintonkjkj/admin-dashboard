import { Component, OnInit } from '@angular/core';
import { NavService } from '../../service/nav.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, zoomOut, zoomIn, fadeIn, bounceIn } from 'ng-animate';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [
    trigger('animateRoute', [transition('* => *', useAnimation(fadeIn, {
      // Set the duration to 5seconds and delay to 2 seconds
      //params: { timing: 3}
    }))])
  ]
})
export class ContentLayoutComponent implements OnInit {

  public right_side_bar: boolean;
  public layoutType: string = 'RTL';
  public layoutClass: boolean = false;
  user: Observable<any>|undefined;   
  public signIn: boolean = false;
  constructor(public afAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore,public navServices: NavService) { }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  public rightSidebar($event) {
    this.right_side_bar = $event
  }

  public clickRtl(val) {
    if (val === 'RTL') {
      document.body.className = 'rtl';
      this.layoutClass = true;
      this.layoutType = 'LTR';
    } else {
      document.body.className = '';
      this.layoutClass = false;
      this.layoutType = 'RTL';
    }
  }

  ngOnInit() { 
    this.navServices.collapseSidebar=true;
    this.afAuth.authState.subscribe(user => {                                                   // grab the user object from Firebase Authorization
      if (user&& user.emailVerified) {
        this.signIn=true;
        let UID = user.uid;
        this.user = this.firestore.collection('admin').doc(UID).valueChanges();
        this.navServices.collapseSidebar=false;
        // get the user's doc in Cloud Firestore
      }
      else
      {
        this.navServices.collapseSidebar=true;
        this.signIn=false;
      }
    });
  }

}

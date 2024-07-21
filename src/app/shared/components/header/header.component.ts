import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavService } from '../../service/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;
  public signIn: boolean = false;
  user: Observable<any>|undefined;    
  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public afAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore,public navServices: NavService) { }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }


  ngOnInit(): void {
    this.open=true;
    this.afAuth.authState.subscribe(user => {                                                   // grab the user object from Firebase Authorization
      if (user&& user.emailVerified) {
        this.signIn=true;
        let UID = user.uid;
        this.user = this.firestore.collection('admin').doc(UID).valueChanges();
        // get the user's doc in Cloud Firestore
        this.open=false;
      }
      else
      {
        this.open=true;
        this.signIn=false;
      }
    });
  }
  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['']);
  }
  login(): void {
    this.router.navigate(['login']);
  }
}

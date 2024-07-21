import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isProgressVisibleLogin: boolean;
  isProgressVisibleSign: boolean;
  loginForm: FormGroup;
  signupForm!: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.isProgressVisibleLogin = false;
    this.isProgressVisibleSign = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    if (this.authService.userLoggedIn) {
      // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
      this.router.navigate(['/pages/dashboard']);
    }

    this.signupForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  loginUser() {
    this.isProgressVisibleLogin = true; // show the progress indicator as we start the Firebase login process
    if (
      this.loginForm.value.email === '' ||
      this.loginForm.value.password === ''
    ) {
      this.isProgressVisibleLogin = false;
      return;
    }
    if (this.loginForm.invalid) {
      this.isProgressVisibleLogin = false;
      return;
    }

    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        this.isProgressVisibleLogin = false; // no matter what, when the auth service returns, we hide the progress indicator
        if (result == null) {
          // null is success, false means there was an error
          console.log('logging in...');
          this.router.navigate(['/dashboard/default']); // when the user is logged in, navigate them to dashboard
        } else if (result.isValid == false) {
          console.log('login error', result);
          this.isProgressVisibleLogin = false;
          this.firebaseErrorMessage = result.message;
          alert(this.firebaseErrorMessage);
        }
      });
  }
  signup() {
    if (this.signupForm.invalid)
      // if there's an error in the form, don't submit it
      return;

    this.isProgressVisibleSign = true;
    this.authService
      .signupUser(this.signupForm.value)
      .then((result) => {
        if (result == null)
          // null is success, false means there was an error
          this.router.navigate(['/dashboard']);
        else if (result.isValid == false) {
          this.firebaseErrorMessage = result.message;
          alert(this.firebaseErrorMessage);
        }

        this.isProgressVisibleSign = false; // no matter what, when the auth service returns, we hide the progress indicator
      })
      .catch(() => {
        this.isProgressVisibleSign = false;
      });
  }

  owlcarousel = [
    {
      title: 'Welcome to Admin Dashboard',
      desc: '',
    },
    {
      title: 'Welcome to Admin Dashboard',
      desc: '',
    },
    {
      title: 'Welcome to Admin Dashboard',
      desc: '',
    },
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true,
  };
}

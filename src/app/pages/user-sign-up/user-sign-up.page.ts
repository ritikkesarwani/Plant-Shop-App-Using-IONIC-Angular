import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.page.html',
  styleUrls: ['./user-sign-up.page.scss'],
})
export class UserSignUpPage implements OnInit {
  submitted = false;
  signUpForm!: FormGroup;
  fieldErrors = {
    mobileNumber: 'Mobile number is required.',
    email: 'Email is required.',
    fullName: 'Full name is required.',
    username: 'Username is required and must be alphanumeric with up to 8 characters.',
    password: 'Password is required and must be at least 6 characters long.',
    confirmPassword: 'Please confirm your password.'
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(35), Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-z0-9]{8,12}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]<>/?{};":\\|]).{8,15}$/)]],
      confirmPassword: ['', Validators.required]
    });
  }

  async register(): Promise<void> {
    this.submitted = true;
    let errorMessage: string | null = null;

    if (!this.signUpForm.get('mobileNumber')?.value) {
      errorMessage = this.fieldErrors.mobileNumber;
    } else if (this.signUpForm.get('mobileNumber')?.invalid) {
      errorMessage = 'Please enter a valid 10-digit mobile number.';
    } else if (!this.signUpForm.get('email')?.value) {
      errorMessage = this.fieldErrors.email;
    } else if (this.signUpForm.get('email')?.invalid) {
      errorMessage = 'Please enter a valid email address';
    } else if (!this.signUpForm.get('fullName')?.value) {
      errorMessage = this.fieldErrors.fullName;
    } else if (this.signUpForm.get('fullName')?.invalid) {
      errorMessage = 'Please enter a valid full name, it  must only contain letters and spaces.';
    } else if (!this.signUpForm.get('username')?.value) {
      errorMessage = this.fieldErrors.username;
    } else if (this.signUpForm.get('username')?.invalid) {
      errorMessage = 'Username must be alphanumeric with up to 8 characters';
    } else if (!this.signUpForm.get('password')?.value) {
      errorMessage = this.fieldErrors.password;
    } else if (this.signUpForm.get('password')?.invalid) {
      errorMessage = 'Please enter a valid password';
    } else if (this.signUpForm.get('password')?.value !== this.signUpForm.get('confirmPassword')?.value) {
      errorMessage = 'Passwords do not match';
    }

    if (errorMessage) {
      this.presentToast(errorMessage);
      return;
    }

    // register, if all fields are valid
    if (this.signUpForm.valid) {
      const userData = this.signUpForm.value;
      localStorage.setItem(userData.username, JSON.stringify(userData));
      this.router.navigate(['/tabs']);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'danger'
    });
    await toast.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/Model/User.data';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.page.html',
  styleUrls: ['./user-sign-up.page.scss'],
})
export class UserSignUpPage implements OnInit {
  registerLoading = false;
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
    private router: Router,
    private loadingController: LoadingController,
    private userAuthService: UserAuthService,
    private navCtrl : NavController
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
    const errorMessage = this.validateForm();

    if (errorMessage) {
      this.presentToast(errorMessage);
      return;
    }
    console.log("Registed got clicked")

    // Proceed with registration if form is valid
    // if (this.signUpForm.valid) {
    //   const userData = this.signUpForm.value;
    //   localStorage.setItem(userData.username, JSON.stringify(userData));
    //   localStorage.setItem('loggedInUser', JSON.stringify(userData));
    //   await this.showRegisterLoading();
    // }

    if (this.signUpForm.valid) {
      const user: User = { ...this.signUpForm.value }; // Copy form value to a new object
      const password = this.signUpForm.get('password')?.value;
      const confirmPassword = this.signUpForm.get('confirmPassword')?.value;
  
      if (password !== confirmPassword) {
        this.presentToast('Passwords do not match');
        return;
      }

      delete user.confirmPassword;

      
      this.registerLoading = true;
      const loading = await this.loadingController.create({
        message: 'Registering...',
        duration: 2000 // Adjust duration as needed
      });
      await loading.present();
  
      try {
        console.log(user)
        const registered = await this.userAuthService.register(user);
        if (registered) {
          this.navigateToTabsPage();
        } else {
          this.presentToast('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        this.presentToast('An unexpected error occurred. Please try again later.');
      }
  
      this.registerLoading = false;
    } else {
      console.log('Invalid form');
    }
    


  }

  validateForm(): string | null {
    if (!this.signUpForm.get('mobileNumber')?.value) {
      return this.fieldErrors.mobileNumber;
    } else if (this.signUpForm.get('mobileNumber')?.invalid) {
      return 'Please enter a valid 10-digit mobile number.';
    } else if (!this.signUpForm.get('email')?.value) {
      return this.fieldErrors.email;
    } else if (this.signUpForm.get('email')?.invalid) {
      return 'Please enter a valid email address';
    } else if (!this.signUpForm.get('fullName')?.value) {
      return this.fieldErrors.fullName;
    } else if (this.signUpForm.get('fullName')?.invalid) {
      return 'Please enter a valid full name, it  must only contain letters and spaces.';
    } else if (!this.signUpForm.get('username')?.value) {
      return this.fieldErrors.username;
    } else if (this.signUpForm.get('username')?.invalid) {
      return 'Username must be alphanumeric with up to 8 characters';
    } else if (!this.signUpForm.get('password')?.value) {
      return this.fieldErrors.password;
    } else if (this.signUpForm.get('password')?.invalid) {
      return 'Please enter a valid password';
    } else if (this.signUpForm.get('password')?.value !== this.signUpForm.get('confirmPassword')?.value) {
      return 'Passwords do not match';
    }
    return null;
  }

  async showRegisterLoading(): Promise<void> {
    this.registerLoading = true;
    const loading = await this.loadingController.create({
      message: 'Registration successful! Logging in...'
    });
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      await this.navigateToTabsPage();
    }, 2000);
  }

  async navigateToTabsPage(): Promise<void> {
    await this.router.navigate(['/tabs']);
  }

  goBack(): void {
    this.navCtrl.navigateBack(['/home']);
    
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

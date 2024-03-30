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
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
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

    if (this.signUpForm.valid) {
      const user: User = { ...this.signUpForm.value };
      const password = this.signUpForm.get('password')?.value;
      const confirmPassword = this.signUpForm.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        this.presentToast('Passwords do not match');
        return;
      }

      delete user.confirmPassword;

      try {
        this.registerLoading = true;
        const loading = await this.loadingController.create({
          message: 'Registering...',
          duration: 2000
        });
        await loading.present();

        const registered = await this.userAuthService.register(user);
        if (registered) {
          await this.navigateToTabsPage();
        } else {
          this.presentToast('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        this.presentToast('An unexpected error occurred. Please try again later.');
      } finally {
        this.registerLoading = false;
      }
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
      return 'Please enter a valid full name, it must only contain letters and spaces.';
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

  async navigateToTabsPage(): Promise<void> {
    await this.router.navigate(['/tabs']);
  }

  goBack(): void {
    this.navCtrl.navigateBack(['/home']);
  }

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'danger'
    });
    await toast.present();
  }
}

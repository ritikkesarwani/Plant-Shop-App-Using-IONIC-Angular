import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User.data';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  loginForm!: FormGroup;
  loginLoading = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: UserAuthService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      this.loginLoading = true;
      const loading = await this.loadingController.create({
        message: 'Logging in...',
        duration: 2000
      });
      await loading.present();

      const { username, password } = this.loginForm.value;

      const loggedIn = await this.authService.login({
        username,
        password,
        mobileNumber: '',
        fullName: '',
        email: ''
      });

      if (loggedIn) {
        try {
          const { value } = await Storage.get({ key: 'loggedInUser' });
          if (value) {
            const userData = JSON.parse(value);

            setTimeout(() => {
              this.navCtrl.navigateForward(['/tabs']);
            }, 2000)

          } else {
            console.error('User data not found in storage');
          }
        } catch (error) {
          console.error('Error retrieving user data from storage:', error);
        }
      } else {
        const toast = await this.toastController.create({
          message: 'Incorrect username or password',
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      }

      this.loginLoading = false;
    } else {
      console.log('Invalid form');
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}

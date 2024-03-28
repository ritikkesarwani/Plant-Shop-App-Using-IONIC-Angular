// user-login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User.data';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  loginForm!: FormGroup;
  loginLoading = false; // Track loading state for login button

  constructor(
    private formBuilder: FormBuilder,
    private authService: UserAuthService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController // Inject LoadingController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // async login(): Promise<void> {
  //   if (this.loginForm.valid) {
  //     this.loginLoading = true; // Show loader for login button
  //     const loading = await this.loadingController.create({
  //       message: 'Logging in...',
  //       duration: 1500 // Show loader for 2 seconds
  //     });
  //     await loading.present();

      
  //     const user = this.loginForm.value as User;
  //     const username = this.loginForm.value.username;
  //     const password = this.loginForm.value.password;

  //     const loggedIn = this.authService.login(username, password);

  //     if (loggedIn) {
  //       // Fetch complete user data from local storage
  //       const storedUserData = localStorage.getItem(username);
  //       if (storedUserData) {
  //         const userData = JSON.parse(storedUserData);
  //         localStorage.setItem('loggedInUser', JSON.stringify(userData)); // Store complete user data
  //         this.navCtrl.navigateForward(['/tabs']);
  //       }}
  //      else {
  //       const toast = await this.toastController.create({
  //         message: 'Incorrect username or password',
  //         duration: 3000,
  //         color: 'danger'
  //       });
  //       await toast.present();
  //     }

  //     this.loginLoading = false; // Hide loader after 2 seconds
  //   }
  //   else {
  //     console.log('Invalid form');
  //   }
  // }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      this.loginLoading = true; // Show loader for login button
      const loading = await this.loadingController.create({
        message: 'Logging in...',
        duration: 3500 // Show loader for 2 seconds
      });
      await loading.present();

      const user = this.loginForm.value as User;
      const loggedIn = await this.authService.login(user);

      if (loggedIn) {
        this.navCtrl.navigateForward(['/tabs']);
      } else {
        const toast = await this.toastController.create({
          message: 'Incorrect username or password',
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      }

      this.loginLoading = false; // Hide loader after 2 seconds
    } else {
      console.log('Invalid form');
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}

